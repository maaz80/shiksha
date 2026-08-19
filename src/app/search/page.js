'use client';

import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch, FiBookOpen, FiFilter, FiCompass, FiX, FiSliders, FiRotateCcw, FiChevronDown, FiCheck } from "react-icons/fi";
import { useCourses } from "@/context/CourseContext";
import CourseCard from "@/components/CourseCard";
import Testimonials from "@/components/Home/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/BreadCrumb";
import { usePageSEO } from "@/hooks/usePageSEO";

const sortOptions = [
     { id: "relevance", label: "Most Relevant" },
     { id: "title-asc", label: "Title: A to Z" },
     { id: "title-desc", label: "Title: Z to A" }
];

const CustomSortDropdown = ({ sortBy, setSortBy }) => {
     const [isOpen, setIsOpen] = useState(false);
     const dropdownRef = useRef(null);

     const selectedOption = sortOptions.find(opt => opt.id === sortBy) || sortOptions[0];

     useEffect(() => {
          const handleClickOutside = (e) => {
               if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                    setIsOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     return (
          <div ref={dropdownRef} className="relative inline-block text-left">
               <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-primary/40 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 transition-all duration-200 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
               >
                    <span>{selectedOption.label}</span>
                    <FiChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
               </button>

               {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200/90 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                         <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                              Sort Courses By
                         </div>
                         {sortOptions.map((option) => {
                              const isSelected = sortBy === option.id;
                              return (
                                   <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => {
                                             setSortBy(option.id);
                                             setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer text-left ${
                                             isSelected
                                                  ? "bg-primary/10 text-primary font-bold"
                                                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                   >
                                        <span>{option.label}</span>
                                        {isSelected && <FiCheck className="w-3.5 h-3.5 text-primary" />}
                                   </button>
                              );
                         })}
                    </div>
               )}
          </div>
     );
};

const SearchResultsContent = () => {
     usePageSEO();
     const searchParams = useSearchParams();
     const router = useRouter();
     const { courses, loading } = useCourses();

     const initialQuery = searchParams.get("q") || "";
     const initialCategory = searchParams.get("category") || "All";

     const [searchQuery, setSearchQuery] = useState(initialQuery);
     const [selectedCategory, setSelectedCategory] = useState(initialCategory);
     const [sortBy, setSortBy] = useState("relevance");

     useEffect(() => {
          const q = searchParams.get("q") || "";
          const cat = searchParams.get("category") || "All";
          setSearchQuery(q);
          setSelectedCategory(cat);
     }, [searchParams]);

     const query = searchQuery.trim().toLowerCase();

     const categoriesList = useMemo(() => {
          const cats = [...new Set(courses.map((c) => c.category).filter(Boolean))];
          return ["All", ...cats];
     }, [courses]);

     const { matchingCourses, recommendedCourses } = useMemo(() => {
          if (!courses || courses.length === 0) {
               return { matchingCourses: [], recommendedCourses: [] };
          }

          let matched = courses.filter((course) => {
               const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

               if (!query) return matchesCategory;

               const titleMatch = (course.title || "").toLowerCase().includes(query);
               const overviewMatch = (course.overview || "").toLowerCase().includes(query);
               const categoryMatch = (course.category || "").toLowerCase().includes(query);
               const slugMatch = (course.slug || "").toLowerCase().includes(query);
               const chapterMatch = course.chapter && Array.isArray(course.chapter) && course.chapter.some(ch =>
                    (ch.chaptername || "").toLowerCase().includes(query)
               );

               return matchesCategory && (titleMatch || overviewMatch || categoryMatch || slugMatch || chapterMatch);
          });

          if (sortBy === "title-asc") {
               matched = [...matched].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
          } else if (sortBy === "title-desc") {
               matched = [...matched].sort((a, b) => (b.title || "").localeCompare(a.title || ""));
          }

          const matchedIds = new Set(matched.map((m) => m._id));
          const recommended = courses.filter((c) => !matchedIds.has(c._id));

          return { matchingCourses: matched, recommendedCourses: recommended };
     }, [courses, query, selectedCategory, sortBy]);

     const updateUrl = (newQuery, newCat) => {
          const params = new URLSearchParams();
          if (newQuery.trim()) params.set("q", newQuery.trim());
          if (newCat && newCat !== "All") params.set("category", newCat);
          
          const queryString = params.toString();
          router.push(`/search${queryString ? `?${queryString}` : ""}`, { scroll: false });
     };

     const handleSearchSubmit = (e) => {
          e.preventDefault();
          updateUrl(searchQuery, selectedCategory);
     };

     const handleCategorySelect = (cat) => {
          setSelectedCategory(cat);
          updateUrl(searchQuery, cat);
     };

     const clearSearchQuery = () => {
          setSearchQuery("");
          updateUrl("", selectedCategory);
     };

     const clearAllFilters = () => {
          setSearchQuery("");
          setSelectedCategory("All");
          router.push("/search", { scroll: false });
     };

     const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "All";

     return (
          <div className="min-h-screen bg-primary-bg text-secondary open-sans flex flex-col relative">
               <Breadcrumb />

               {/* TOP HERO CONTROL BAR */}
               <section className="bg-primary text-white py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-b border-primary/20 shadow-sm">
                    <div className="max-w-7xl mx-auto space-y-6">
                         
                         {/* Header Title */}
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="space-y-1.5 text-left">
                                   <span className="bg-white/20 text-white border border-white/30 text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-xl inline-block">
                                        Live Classes & Courses Explorer
                                   </span>
                                   <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                                        {query ? `Search Results for "${searchQuery}"` : selectedCategory !== "All" ? `${selectedCategory} Courses` : "Explore All Courses"}
                                   </h1>
                                   <p className="text-white/90 text-xs md:text-sm font-medium">
                                        {matchingCourses.length > 0 ? (
                                             <>Showing <span className="text-white font-extrabold underline underline-offset-4">{matchingCourses.length}</span> course{matchingCourses.length === 1 ? '' : 's'} available</>
                                        ) : (
                                             <>No exact matches for "{searchQuery}" — showing <span className="text-white font-extrabold underline underline-offset-4">{recommendedCourses.length}</span> related course{recommendedCourses.length === 1 ? '' : 's'}</>
                                        )}
                                   </p>
                              </div>

                              {/* Search Form in Hero */}
                              <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96 shrink-0 shadow-md rounded-xl">
                                   <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by course title or topic..."
                                        className="w-full h-12 pl-4 pr-11 rounded-xl border-0 bg-white text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                                   />
                                   {searchQuery ? (
                                        <button
                                             type="button"
                                             onClick={clearSearchQuery}
                                             aria-label="Clear search"
                                             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                        >
                                             <FiX size={18} />
                                        </button>
                                   ) : (
                                        <button
                                             type="submit"
                                             aria-label="Submit search"
                                             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform cursor-pointer"
                                        >
                                             <FiSearch size={18} />
                                        </button>
                                   )}
                              </form>
                         </div>

                         {/* ACTIVE FILTER PILLS ROW */}
                         {hasActiveFilters && (
                              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/20">
                                   <span className="text-xs text-white/90 font-bold mr-1 flex items-center gap-1">
                                        <FiSliders className="w-3.5 h-3.5 text-white" /> Active Filters:
                                   </span>

                                   {searchQuery.trim() && (
                                        <span className="inline-flex items-center gap-1.5 bg-white/20 text-white border border-white/30 text-xs font-bold px-3 py-1 rounded-xl backdrop-blur-xs">
                                             Search: "{searchQuery}"
                                             <button onClick={clearSearchQuery} className="hover:text-amber-200 transition-colors cursor-pointer">
                                                  <FiX size={14} />
                                             </button>
                                        </span>
                                   )}

                                   {selectedCategory !== "All" && (
                                        <span className="inline-flex items-center gap-1.5 bg-white text-primary text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
                                             Category: {selectedCategory}
                                             <button onClick={() => handleCategorySelect("All")} className="hover:text-slate-900 transition-colors cursor-pointer">
                                                  <FiX size={14} />
                                             </button>
                                        </span>
                                   )}

                                   <button
                                        onClick={clearAllFilters}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-white/90 hover:text-white underline underline-offset-2 transition-colors cursor-pointer ml-2"
                                   >
                                        <FiRotateCcw size={13} />
                                        <span>Reset All</span>
                                   </button>
                              </div>
                         )}

                    </div>
               </section>

               {/* MAIN PAGE BODY */}
               <section className="py-8 md:py-12 bg-primary-bg flex-1">
                    <div className="max-w-330 mx-auto px-4 sm:px-4 lg:px-0">

                         {/* LOADING OVERLAY */}
                         {loading ? (
                              <div className="bg-white rounded-xl border border-slate-200 p-16 flex flex-col items-center justify-center gap-4 my-8 shadow-xs">
                                   <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                   <span className="text-slate-600 font-bold text-sm">Fetching courses catalog...</span>
                              </div>
                         ) : (

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                   {/* LEFT SIDEBAR FILTERS WITH MATCHED ROUNDED-XL STYLING */}
                                   <div className="lg:col-span-3 flex flex-col gap-6">

                                        {/* CATEGORIES ACCORDION / LIST */}
                                        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs text-left">
                                             <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                                                  <h2 className="text-xs font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wider open-sans">
                                                       <FiFilter className="text-primary text-base" />
                                                       Course Categories
                                                  </h2>
                                                  {selectedCategory !== "All" && (
                                                       <button
                                                            onClick={() => handleCategorySelect("All")}
                                                            className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                                                       >
                                                            Clear
                                                       </button>
                                                  )}
                                             </div>

                                             <div className="flex flex-col gap-1.5 max-h-96 overflow-y-auto pr-1">
                                                  {categoriesList.map((cat) => {
                                                       const count = cat === "All"
                                                            ? courses.length
                                                            : courses.filter(c => c.category === cat).length;

                                                       const isSelected = selectedCategory === cat;

                                                       return (
                                                            <button
                                                                 key={cat}
                                                                 type="button"
                                                                 onClick={() => handleCategorySelect(cat)}
                                                                 className={`w-full flex items-center justify-between text-xs px-3.5 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer text-left ${isSelected
                                                                      ? "bg-primary text-white shadow-xs"
                                                                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                                                      }`}
                                                            >
                                                                 <span className="truncate pr-2">{cat}</span>
                                                                 <span className={`px-2.5 py-0.5 rounded-xl text-[10px] font-extrabold shrink-0 ${isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                                                      {count}
                                                                 </span>
                                                            </button>
                                                       );
                                                  })}
                                             </div>
                                        </div>

                                        {/* QUICK COUNSELING BANNER */}
                                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5 text-left space-y-2">
                                             <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                                                  Need Academic Advice?
                                             </h3>
                                             <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                                  Speak directly with our learning counselors to find your perfect course path.
                                             </p>
                                             <a
                                                  href="tel:+919311500424"
                                                  className="inline-block mt-1 text-xs font-bold text-primary hover:underline"
                                             >
                                                  📞 Call Counselor: +91 9311500424
                                             </a>
                                        </div>

                                   </div>

                                   {/* RIGHT MAIN COURSES GRID AREA */}
                                   <div className="lg:col-span-9 flex flex-col gap-8">

                                        {/* HEADER SORTING & METADATA BAR WITH CUSTOM POPPER DROPDOWN */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 px-5 py-3.5 rounded-xl shadow-xs">
                                             <div className="flex items-center gap-2 open-sans">
                                                  <FiBookOpen className="text-primary text-lg" />
                                                  <span className="text-sm font-bold text-slate-900">
                                                       {matchingCourses.length > 0
                                                            ? `${matchingCourses.length} Course${matchingCourses.length === 1 ? '' : 's'} Found`
                                                            : `0 Matches — Showing ${recommendedCourses.length} Related Courses`
                                                       }
                                                  </span>
                                             </div>

                                             {/* CUSTOM POPPER SORT DROPDOWN */}
                                             <div className="flex items-center gap-2.5 self-end sm:self-center">
                                                  <span className="text-xs text-slate-500 font-bold whitespace-nowrap">Sort By:</span>
                                                  <CustomSortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                                             </div>
                                        </div>

                                        {/* MATCHED COURSES GRID OR RELATED COURSES GRID */}
                                        {matchingCourses.length > 0 ? (
                                             <>
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                       {matchingCourses.map((course) => (
                                                            <CourseCard key={course._id} course={course} className="w-full" />
                                                       ))}
                                                  </div>

                                                  {/* RECOMMENDED COURSES SECTION */}
                                                  {recommendedCourses.length > 0 && (
                                                       <div className="space-y-4 pt-6 border-t border-slate-200/70">
                                                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-left">
                                                                 <h2 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                                                                      <FiCompass className="text-primary text-lg" />
                                                                      Other Top Recommended Courses ({recommendedCourses.length})
                                                                 </h2>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                 {recommendedCourses.map((course) => (
                                                                      <CourseCard key={course._id} course={course} className="w-full" />
                                                                 ))}
                                                            </div>
                                                       </div>
                                                  )}
                                             </>
                                        ) : (
                                             /* NO MATCH - SHOW RELATED COURSES DIRECTLY */
                                             <div className="space-y-6">
                                                  <div className="bg-amber-50/90 rounded-xl border border-amber-200/80 p-5 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                                                       <div className="space-y-1">
                                                            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                                                                 <FiCompass className="text-amber-600 text-lg" />
                                                                 No exact match found for "{searchQuery}"
                                                            </h3>
                                                            <p className="text-xs text-amber-800 font-medium">
                                                                 We couldn't find exact courses matching <span className="font-bold">"{searchQuery}"</span>. Showing popular and related courses below that you can explore.
                                                            </p>
                                                       </div>
                                                       <button
                                                            onClick={clearAllFilters}
                                                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
                                                       >
                                                            Clear Search Filter
                                                       </button>
                                                  </div>

                                                  {recommendedCourses.length > 0 && (
                                                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {recommendedCourses.map((course) => (
                                                                 <CourseCard key={course._id} course={course} className="w-full" />
                                                            ))}
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                   </div>

                              </div>
                         )}

                    </div>
               </section>

          </div>
     );
};

export default function SearchPage() {
     return (
          <Suspense fallback={
               <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-primary-bg text-secondary">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-500 font-bold text-xs">Loading Search Explorer...</span>
               </div>
          }>
               <SearchResultsContent />
               <Testimonials />
               <div className="max-w-330 mx-auto px-4">

               <RelatedBlogs />
              <div className="mt-10"> <FAQ /></div>
               </div>
          </Suspense>
     );
}
