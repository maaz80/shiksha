"use client";

import { ChevronDown, Grip, Menu, Search, X, LogOut } from 'lucide-react';
import logo from '../assets//shiksha-logo.webp';
import CourseImage from '../assets/course-card.webp';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isUserLoggedIn, logoutUser } from '../utils/auth.js';
import { API_URL } from '../utils/api.js';
import { useCourses } from '../context/CourseContext.jsx';

export default function Navbar({ isModal, setIsModal, setIsLogin, isLogin, onCoursesMouseEnter, onCoursesMouseLeave }) {
     const [isMore, setIsMore] = useState(false);
     const [isMenu, setIsMenu] = useState(false);
     const [user, setUser] = useState(null);
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     const [filteredCourses, setFilteredCourses] = useState([]);
     const [loadingSearch, setLoadingSearch] = useState(false);
     const { courses } = useCourses();
     const router = useRouter();

     const [suggestedCourses, setSuggestedCourses] = useState([]);
     const [isSearchOpen, setIsSearchOpen] = useState(false);
     const searchContainerRef = useRef(null);
     const mobileSearchRef = useRef(null);

     const fallbackMoreItems = {
          title: "More",
          dropdown_items: [
               {
                    title: "Resources",
                    items: [
                         { name: "Blogs", link: "/category/blogs" },
                         { name: "Articles", link: "#" },
                         { name: "Guides", link: "#" },
                         { name: "News & Updates", link: "#" }
                    ]
               },
               {
                    title: "Company",
                    items: [
                         { name: "About Us", link: "/about-us" },
                         { name: "Careers", link: "#" },
                         { name: "Press & Media", link: "#" },
                         { name: "Our Partners", link: "#" }
                    ]
               },
               {
                    title: "Support",
                    items: [
                         { name: "Contact Us", link: "/contact-us" },
                         { name: "Help Center", link: "#" },
                         { name: "Privacy Policy", link: "/privacy-policy" },
                         { name: "Terms of Service", link: "/disclaimer" }
                    ]
               },
               {
                    title: "Services",
                    items: [
                         { name: "Hire From Us", link: "#" },
                         { name: "Corporate Training", link: "#" },
                         { name: "Custom Solutions", link: "#" },
                         { name: "Advisory Services", link: "#" }
                    ]
               }
          ]
     };

     // Dynamic states mapping to backend Navbar schema
     const [logoText, setLogoText] = useState("");
     const [buttonName, setButtonName] = useState("All Courses");
     const [searchPlaceholder, setSearchPlaceholder] = useState("Search your course");
     const [dropdownName, setDropdownName] = useState("More");
     const [dropdownItems, setDropdownItems] = useState([
          { name: "Resources", link: "#" },
          { name: "Hire From Us", link: "#" }
     ]);
     const [logoutButtonName, setLogoutButtonName] = useState("Logout");
     const [moreItems, setMoreItems] = useState(null);

     const activeDropdownItems = (moreItems?.dropdown_items && moreItems.dropdown_items.length > 0)
          ? moreItems.dropdown_items
          : fallbackMoreItems.dropdown_items;

     const colsCount = activeDropdownItems.length;

     useEffect(() => {
          const fetchNavbarData = async () => {
               try {
                    const res = await fetch(`${API_URL}/navbar-data`);
                    if (res.ok) {
                         const data = await res.json();
                         if (data) {
                              setLogoText(data.logo || "");
                              setButtonName(data.buttonName || "All Courses");
                              setSearchPlaceholder(data.searchPlaceholder || "Search your course");
                              setDropdownName(data.dropdownName || "More");
                              if (Array.isArray(data.dropdownItems) && data.dropdownItems.length > 0) {
                                   setDropdownItems(data.dropdownItems);
                              }
                              setLogoutButtonName(data.logoutButtonName || "Logout");
                              setMoreItems(data.moreItems || null);
                         }
                    }
               } catch (err) {
                    console.error("Failed to fetch navbar config:", err);
               }
          };

          fetchNavbarData();
     }, []);

     useEffect(() => {
          const delay = setTimeout(() => {
               const query = searchTerm.trim().toLowerCase();
               if (query.length < 2) {
                    setFilteredCourses([]);
                    setSuggestedCourses([]);
                    return;
               }

               setLoadingSearch(true);

               // Direct Matches
               const direct = courses.filter(course => {
                    const title = (course.title || course.name || course.courseTitle || "").toLowerCase();
                    const overview = (course.overview || "").toLowerCase();
                    const category = (course.category || "").toLowerCase();
                    return title.includes(query) || overview.includes(query) || category.includes(query);
               });
               setFilteredCourses(direct);

               // Related Matches (Same Category, but not in direct matches)
               const directCategories = [...new Set(direct.map(c => c.category).filter(Boolean))];
               if (directCategories.length > 0) {
                    const related = courses.filter(course =>
                         directCategories.includes(course.category) &&
                         !direct.some(d => d._id === course._id)
                    );
                    setSuggestedCourses(related);
               } else {
                    setSuggestedCourses([]);
               }

               setLoadingSearch(false);
          }, 300); // debounce

          return () => clearTimeout(delay);
     }, [searchTerm, courses]);

     useEffect(() => {
          const handleClickOutside = (e) => {
               if (
                    (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) &&
                    (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target))
               ) {
                    setSearchTerm("");
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     useEffect(() => {
          // Check if user is logged in on mount
          const checkUser = async () => {
               if (isUserLoggedIn()) {
                    const userData = await getCurrentUser();
                    setUser(userData);
                    setIsLoggedIn(true);
               }
          };
          checkUser();
     }, []);

     useEffect(() => {
          document.body.style.overflow = isMenu ? "hidden" : "";
     }, [isMenu]);

     const handleLogout = async () => {
          await logoutUser();
          setUser(null);
          setIsLoggedIn(false);
          setIsMenu(false);
     };

     const handleLoginClick = () => {
          if (isLoggedIn) {
               handleLogout();
          } else {
               setIsLogin(!isLogin);
               setIsMenu(false);
          }
     };

     return (
          <header className="w-full fixed top-0 bg-primary-bg z-99999 font-sans">
               <div className="mx-auto w-full max-w-350 h-15 md:h-16 lg:h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
                    <div className='2xl:hidden text-secondary cursor-pointer'>
                         <button onClick={() => setIsMenu(true)} aria-label="Open navigation menu" className="p-2">
                              <Menu />
                         </button>

                         {/* Menu Modal Drawer */}
                         <div
                              onClick={() => setIsMenu(false)}
                              className={`fixed inset-0 bg-black/40 z-9999 transition-opacity duration-300 ${
                                   isMenu ? "opacity-100 visible" : "opacity-0 invisible"
                              }`}
                         />

                         <div
                              className={`fixed top-0 left-0 h-screen w-[85%] max-w-90 bg-white z-9999 flex flex-col justify-between transition-all duration-300 ease-in-out ${
                                   isMenu ? "translate-x-0" : "-translate-x-full"
                              }`}
                         >
                              {/* Top */}
                              <div className="p-5">
                                   <div className="flex items-center justify-between mb-6">
                                        <img src={logoText || logo?.src || logo} alt='Shiksha Logo'
                                             width="120"
                                             height="32"
                                             className="h-8 w-auto object-contain" />
                                        <button onClick={() => setIsMenu(false)} aria-label="Close navigation menu" className="text-2xl cursor-pointer p-2 rounded">
                                             <X />
                                        </button>
                                   </div>
                                    {/* Drawer Menu Items */}
                                    <div className="flex flex-col gap-5 text-[16px] text-secondary max-h-[68vh] overflow-y-auto pr-1">
                                         <div onClick={() => {
                                              setIsMenu(false);
                                              setIsModal(true);
                                         }} className="flex justify-between items-center cursor-pointer font-semibold">
                                              {buttonName}
                                              <span>›</span>
                                         </div>

                                         {((moreItems?.dropdown_items && moreItems.dropdown_items.length > 0) ? moreItems.dropdown_items : fallbackMoreItems.dropdown_items).map((cat, catIdx) => (
                                              <div key={catIdx} className="flex flex-col gap-2 pl-2 text-left">
                                                   <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">
                                                        {cat.title}
                                                   </span>
                                                   {cat.items && cat.items.map((subItem, subIdx) => (
                                                        <div
                                                             key={subIdx}
                                                             onClick={() => {
                                                                  setIsMenu(false);
                                                                  if (subItem.link && subItem.link !== "#") {
                                                                       router.push(subItem.link);
                                                                  }
                                                             }}
                                                             className="text-[14px] text-secondary hover:text-primary transition pl-2 cursor-pointer font-medium"
                                                        >
                                                             {subItem.name}
                                                        </div>
                                                   ))}
                                              </div>
                                         ))}
                                    </div>
                              </div>

                              {/* Drawer Bottom Buttons */}
                              <div className="p-5 border-t flex gap-3">
                                   {isLoggedIn ? (
                                        <>
                                             <div className="flex-1 h-12 rounded-md bg-primary text-white font-medium flex items-center justify-center">
                                                  {user?.name?.split(' ')[0]}
                                             </div>
                                             <button onClick={handleLogout} className="flex-1 h-12 rounded-md border border-primary text-primary font-medium hover:bg-orange-50 transition flex items-center justify-center gap-2">
                                                  <LogOut size={16} />
                                                  {logoutButtonName}
                                             </button>
                                        </>
                                   ) : (
                                        <>
                                             <button onClick={() => {
                                                  setIsMenu(false);
                                                  setIsLogin(true);
                                             }} className="flex-1 h-12 rounded-md border border-primary text-primary font-medium hover:bg-orange-50 transition">
                                                  Login
                                             </button>
                                             <button onClick={() => {
                                                  setIsMenu(false);
                                                  setIsLogin(true);
                                             }} className="flex-1 h-12 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition">
                                                  Sign Up
                                             </button>
                                        </>
                                   )}
                              </div>
                         </div>
                    </div>

                    <div className='flex items-center gap-3 md:gap-10'>
                         {/* Logo Branding */}
                         <Link href='/' className="flex items-center shrink-0 min-w-fit">
                              <img
                                   src={logoText || logo?.src || logo}
                                   alt="Shiksha Designs"
                                   width={144}
                                   height={44}
                                   className="h-11 w-24 md:w-36 object-contain"
                              />
                         </Link>

                         {/* Center section */}
                         <div className="flex items-center flex-1 justify-center gap-3 lg:gap-5 min-w-0">
                              {/* Grip Action Button */}
                              <button
                                   onClick={() => setIsModal(!isModal)}
                                   onMouseEnter={onCoursesMouseEnter}
                                   onMouseLeave={onCoursesMouseLeave}
                                   className="flex h-9 md:h-12 justify-center w-30.25 md:w-35.75 rounded-md bg-primary text-white text-[14px] md:text-[16px] items-center gap-2 shadow-sm hover:bg-primary-hover cursor-pointer transition-all duration-300 ease-in-out"
                              >
                                   <Grip />
                                   {buttonName}
                              </button>
                              {/* Search bar */}
                              <div ref={searchContainerRef} className="flex-1 max-w-105 min-w-45 relative hidden 2xl:block">
                                   <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder={searchPlaceholder}
                                        className="w-[288px] h-10 rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                   />
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                   {searchTerm.length >= 2 && (
                                        <div className="absolute top-full mt-2 left-0 w-80 bg-white border border-zinc-200 rounded-md shadow-2xl overflow-y-auto max-h-80 z-9999">
                                             {loadingSearch ? (
                                                  <div className="p-3 text-gray-500 text-center text-xs">Searching...</div>
                                             ) : filteredCourses.length > 0 || suggestedCourses.length > 0 ? (
                                                  <div className="flex flex-col">
                                                       {/* Direct Matches */}
                                                       {filteredCourses.length > 0 && (
                                                            <div>
                                                                 <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 border-b text-left">
                                                                      Matching Courses
                                                                 </div>
                                                                 <div className="divide-y divide-zinc-100">
                                                                      {filteredCourses.map((course) => (
                                                                           <Link
                                                                                key={course._id}
                                                                                href={`/${course.slug || course._id}`}
                                                                                onClick={() => setSearchTerm("")}
                                                                                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors text-left"
                                                                           >
                                                                                <img src={course.image || CourseImage.src || CourseImage} className="w-9 h-9 object-cover rounded-md" />
                                                                                <div className="flex-1 min-w-0">
                                                                                     <div className="text-xs font-semibold text-neutral-900 truncate">{course.title}</div>
                                                                                     <div className="text-[10px] text-zinc-500 truncate">{course.category}</div>
                                                                                </div>
                                                                           </Link>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                       )}

                                                       {/* Related Suggestions */}
                                                       {suggestedCourses.length > 0 && (
                                                            <div>
                                                                 <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 border-y text-left">
                                                                      Related Suggestions
                                                                 </div>
                                                                 <div className="divide-y divide-zinc-100">
                                                                      {suggestedCourses.slice(0, 3).map((course) => (
                                                                           <Link
                                                                                key={course._id}
                                                                                href={`/${course.slug || course._id}`}
                                                                                onClick={() => setSearchTerm("")}
                                                                                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors text-left"
                                                                           >
                                                                                <img src={course.image || CourseImage.src || CourseImage} className="w-9 h-9 object-cover rounded-md" />
                                                                                <div className="flex-1 min-w-0">
                                                                                     <div className="text-xs font-semibold text-neutral-900 truncate">{course.title}</div>
                                                                                     <div className="text-[10px] text-zinc-500 truncate">{course.category}</div>
                                                                                </div>
                                                                           </Link>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                       )}
                                                  </div>
                                             ) : (
                                                  <div className="px-4 py-6 text-center text-zinc-500 text-xs font-medium">No results found</div>
                                             )}
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>                    {/* Right section */}
                    <div className="items-center gap-4 lg:gap-2 shrink-0 text-sm text-gray-700 hidden 2xl:flex">
                         <div
                              className="relative group"
                              onMouseEnter={() => setIsMore(true)}
                              onMouseLeave={() => setIsMore(false)}
                         >
                              <button className="hidden sm:flex h-12 w-27.5 items-center justify-center rounded-t-md text-secondary text-[14px] transition-all duration-300 ease-in-out cursor-pointer group-hover:bg-white">
                                   {moreItems?.title || dropdownName}
                                   <ChevronDown
                                        className={`${isMore ? 'rotate-180' : 'rotate-0'} transition-all duration-300 ease-in-out`}
                                   />
                              </button>
                               {/* Dropdown Links Panel */}
                               <div
                                    className={`absolute top-12 right-0 bg-white border border-gray-100 p-6 rounded-b-lg opacity-0 invisible -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-99999 shadow-lg ${
                                         colsCount === 1 ? "w-60" : colsCount === 2 ? "w-md" : colsCount === 3 ? "w-160" : "w-208"
                                    }`}
                               >
                                    <div className={`grid gap-6 text-left ${
                                         colsCount === 1 ? "grid-cols-1" : colsCount === 2 ? "grid-cols-2" : colsCount === 3 ? "grid-cols-3" : "grid-cols-4"
                                    }`}>
                                         {activeDropdownItems.map((cat, catIdx) => (
                                              <div key={catIdx} className="flex flex-col">
                                                   <h3 className="text-[14px] font-bold uppercase tracking-wider text-neutral-900 border-b border-zinc-100 pb-2 mb-3">
                                                        {cat.title}
                                                   </h3>
                                                   <div className="flex flex-col gap-2">
                                                        {cat.items && cat.items.map((subItem, subIdx) => (
                                                             <button
                                                                  key={subIdx}
                                                                  onClick={() => {
                                                                       window.dataLayer = window.dataLayer || [];
                                                                       window.dataLayer.push({
                                                                            event: `${subItem.name.toLowerCase().replace(/\s+/g, '_')}_button_click`,
                                                                            button_name: subItem.name,
                                                                       });
                                                                       if (subItem.link && subItem.link !== "#") {
                                                                            router.push(subItem.link);
                                                                       }
                                                                  }}
                                                                  className="text-[16px] text-zinc-600 hover:text-primary transition-colors text-left bg-transparent border-0 p-0 cursor-pointer"
                                                             >
                                                                  {subItem.name}
                                                             </button>
                                                        ))}
                                                   </div>
                                              </div>
                                         ))}
                                    </div>
                               </div>
                          </div>

                         <button onClick={handleLoginClick} className={`h-12 w-27.5 flex items-center justify-center rounded-md border text-[16px] transition-all duration-300 ease-in-out cursor-pointer ${
                              isLoggedIn
                                   ? 'border-primary text-white bg-primary hover:bg-primary-hover'
                                   : 'border-primary text-primary hover:bg-primary hover:text-white'
                         }`}>
                              {isLoggedIn ? (
                                   <>
                                        <LogOut size={16} />
                                        <span className="ml-2">{logoutButtonName}</span>
                                   </>
                              ) : (
                                   'Login'
                              )}
                         </button>
                    </div>
                     <div className="2xl:hidden text-secondary">
                          <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search" className="p-2 cursor-pointer flex items-center justify-center">
                               {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                          </button>
                     </div>
                </div>

                {/* Mobile Search Bar Panel */}
                {isSearchOpen && (
                     <div ref={mobileSearchRef} className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex flex-col gap-2 2xl:hidden shadow-md z-9999">
                          <div className="relative">
                               <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    autoFocus
                                    className="w-full h-10 border border-gray-300 rounded-md bg-white pl-10 pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                               />
                               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                               {searchTerm && (
                                    <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                         <X size={16} />
                                    </button>
                               )}
                          </div>

                          {searchTerm.length >= 2 && (
                               <div className="bg-white rounded-md max-h-60 overflow-y-auto mt-1 border border-gray-200 shadow-lg text-sm">
                                    {loadingSearch ? (
                                         <div className="p-3 text-gray-500 text-center">Searching...</div>
                                    ) : filteredCourses.length > 0 || suggestedCourses.length > 0 ? (
                                         <div className="flex flex-col">
                                              {/* Direct Matches */}
                                              {filteredCourses.length > 0 && (
                                                   <div>
                                                        <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-b text-left">
                                                             Matching Courses
                                                        </div>
                                                        <div className="divide-y divide-gray-100">
                                                             {filteredCourses.map((course) => (
                                                                  <Link
                                                                       key={course._id}
                                                                       href={`/${course.slug || course._id}`}
                                                                       onClick={() => {
                                                                            setSearchTerm("");
                                                                            setIsSearchOpen(false);
                                                                       }}
                                                                       className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                                                  >
                                                                       <img src={course.image || CourseImage.src || CourseImage} className="w-9 h-9 object-cover rounded-md" />
                                                                       <div className="flex-1 min-w-0">
                                                                            <div className="text-xs font-semibold text-neutral-900 truncate">{course.title}</div>
                                                                            <div className="text-[10px] text-gray-500 truncate">{course.category}</div>
                                                                       </div>
                                                                  </Link>
                                                             ))}
                                                        </div>
                                                   </div>
                                              )}

                                              {/* Related Suggestions */}
                                              {suggestedCourses.length > 0 && (
                                                   <div>
                                                        <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-y text-left">
                                                             Related Suggestions
                                                        </div>
                                                        <div className="divide-y divide-gray-100">
                                                             {suggestedCourses.slice(0, 3).map((course) => (
                                                                  <Link
                                                                       key={course._id}
                                                                       href={`/${course.slug || course._id}`}
                                                                       onClick={() => {
                                                                            setSearchTerm("");
                                                                            setIsSearchOpen(false);
                                                                       }}
                                                                       className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                                                  >
                                                                       <img src={course.image || CourseImage.src || CourseImage} className="w-9 h-9 object-cover rounded-md" />
                                                                       <div className="flex-1 min-w-0">
                                                                            <div className="text-xs font-semibold text-neutral-900 truncate">{course.title}</div>
                                                                            <div className="text-[10px] text-gray-500 truncate">{course.category}</div>
                                                                       </div>
                                                                  </Link>
                                                             ))}
                                                        </div>
                                                   </div>
                                              )}
                                         </div>
                                    ) : (
                                         <div className="px-4 py-6 text-center text-gray-500 text-xs font-medium">No results found</div>
                                    )}
                               </div>
                          )}
                     </div>
                )}
           </header>
     );
}
