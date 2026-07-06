"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLocations } from '../utils/locations';
import { API_URL } from '../utils/api.js';
import {
  FaFacebookF,
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedinIn,
  FaLinkedin,
  FaTwitter,
  FaTwitterSquare,
  FaYoutube,
  FaYoutubeSquare,
  FaGithub,
  FaGithubSquare,
  FaPinterest,
  FaPinterestP,
  FaPinterestSquare,
  FaTiktok,
  FaWhatsapp,
  FaWhatsappSquare,
  FaTelegram,
  FaTelegramPlane,
  FaSnapchat,
  FaSnapchatGhost,
  FaSnapchatSquare,
  FaReddit,
  FaRedditSquare,
  FaMedium,
  FaMediumM,
  FaDiscord,
  FaGlobe,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import {
  RiTwitterXLine,
  RiTwitterXFill,
  RiTwitterFill,
  RiTwitterLine,
  RiFacebookFill,
  RiFacebookLine,
  RiFacebookCircleFill,
  RiFacebookCircleLine,
  RiInstagramFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiLinkedinLine,
  RiYoutubeFill,
  RiYoutubeLine,
  RiGithubFill,
  RiGithubLine,
  RiPinterestFill,
  RiPinterestLine,
  RiTiktokFill,
  RiTiktokLine,
  RiWhatsappFill,
  RiWhatsappLine,
  RiTelegramFill,
  RiTelegramLine,
  RiSnapchatFill,
  RiSnapchatLine,
  RiRedditFill,
  RiRedditLine,
  RiDiscordFill,
  RiDiscordLine,
  RiGlobalFill,
  RiGlobalLine,
  RiMailFill,
  RiMailLine,
  RiPhoneFill,
  RiPhoneLine
} from "react-icons/ri";
import {
  CiYoutube,
  CiFacebook,
  CiInstagram,
  CiLinkedin,
  CiTwitter,
  CiMail,
  CiGlobe,
  CiPhone
} from "react-icons/ci";

const iconMap = {
  // FontAwesome
  FaFacebookF,
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedinIn,
  FaLinkedin,
  FaTwitter,
  FaTwitterSquare,
  FaYoutube,
  FaYoutubeSquare,
  FaGithub,
  FaGithubSquare,
  FaPinterest,
  FaPinterestP,
  FaPinterestSquare,
  FaTiktok,
  FaWhatsapp,
  FaWhatsappSquare,
  FaTelegram,
  FaTelegramPlane,
  FaSnapchat,
  FaSnapchatGhost,
  FaSnapchatSquare,
  FaReddit,
  FaRedditSquare,
  FaMedium,
  FaMediumM,
  FaDiscord,
  FaGlobe,
  FaEnvelope,
  FaPhone,

  // Remix Icons
  RiTwitterXLine,
  RiTwitterXFill,
  RiTwitterFill,
  RiTwitterLine,
  RiFacebookFill,
  RiFacebookLine,
  RiFacebookCircleFill,
  RiFacebookCircleLine,
  RiInstagramFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiLinkedinLine,
  RiYoutubeFill,
  RiYoutubeLine,
  RiGithubFill,
  RiGithubLine,
  RiPinterestFill,
  RiPinterestLine,
  RiTiktokFill,
  RiTiktokLine,
  RiWhatsappFill,
  RiWhatsappLine,
  RiTelegramFill,
  RiTelegramLine,
  RiSnapchatFill,
  RiSnapchatLine,
  RiRedditFill,
  RiRedditLine,
  RiDiscordFill,
  RiDiscordLine,
  RiGlobalFill,
  RiGlobalLine,
  RiMailFill,
  RiMailLine,
  RiPhoneFill,
  RiPhoneLine,

  // Cosmo Icons
  CiYoutube,
  CiFacebook,
  CiInstagram,
  CiLinkedin,
  CiTwitter,
  CiMail,
  CiGlobe,
  CiPhone
};

function getIconComponent(iconName) {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}

export default function Footer() {
     const [locations, setLocations] = useState([]);
     const defaultColumns = [
          {
               title: "Company",
               links: [
                    { label: "About us", path: "/about-us" },
                    { label: "Courses", path: "/courses" },
                    { label: "Disclaimer", path: "/disclaimer" },
                    { label: "Privacy Policy", path: "/privacy-policy" },
                    { label: "Contact us", path: "/contact-us" },
                    { label: "Blogs", path: "/category/blogs" },
               ]
          },
          {
               title: "For Business",
               links: [
                    { label: "About us", path: "/about-us" },
                    { label: "Careers", path: "/careers" },
               ]
          },
          {
               title: "Popular Courses",
               links: [
                    { label: "UI UX Design Course", path: "/" },
                    { label: "AI Design Tool Course", path: "/" },
               ]
          },
          {
               title: "Trending Courses",
               links: [
                    { label: "Video Editing Course", path: "/" },
                    { label: "Product Design Course", path: "/" },
                    { label: "Full Stack Development Course", path: "/" },
               ]
          }
     ];
     const [footerColumns, setFooterColumns] = useState(defaultColumns);
     const [settings, setSettings] = useState(null);

     useEffect(() => {
          const fetchLocations = async () => {
               const data = await getLocations();
               setLocations(data);
          };

          const fetchFooterColumns = async () => {
               try {
                     const res = await fetch(`${API_URL}/footer-columns`);
                    if (res.ok) {
                         const data = await res.json();
                         if (data && data.length > 0) {
                              setFooterColumns(data);
                         }
                    }
               } catch (err) {
                    console.error("Failed to fetch footer columns", err);
               }
          };

          const fetchFooterSettings = async () => {
               try {
                     const res = await fetch(`${API_URL}/footer-columns/global`);
                    if (res.ok) {
                         const data = await res.json();
                         setSettings(data);
                    }
               } catch (err) {
                    console.error("Failed to fetch global footer settings", err);
               }
          };

          fetchLocations();
          fetchFooterColumns();
          fetchFooterSettings();
     }, []);

     return (
          <footer className="bg-dark-blue text-white w-full mt-20">
               <div className="mx-auto max-w-330 px-6 md:px-9 2xl:px-10 pt-12 md:pt-14 2xl:pt-16 pb-5">

                    {/* TOP GRID */}
                    <div className="
          grid gap-y-10 gap-x-8
          grid-cols-1
          md:grid-cols-3
          2xl:grid-cols-5
        ">

                         {/* Follow us */}
                         <div className="order-1 md:order-3 2xl:order-1">
                              <h3 className="text-[20px] mb-5">{settings?.buttontitle || "Follow us!"}</h3>

                              {(settings?.buttonname || !settings) && (
                                   <button className="w-43 h-11 border border-white/70 rounded-lg text-[12px] text-white/80 mb-5 hover:bg-white/5 transition">
                                        {settings?.buttonname || "Refer & Earn"}
                                   </button>
                              )}

                              <div className="flex gap-3">
                                    {settings && settings.socials && settings.socials.length > 0 ? (
                                         settings.socials.map((social, i) => {
                                              const IconComponent = getIconComponent(social.icon);
                                              if (!IconComponent) return null;

                                              const getSocialLabel = (iconName) => {
                                                   if (!iconName) return "Social Link";
                                                   const name = iconName.replace(/^(Fa|Ri|Ci|Bs|Io|Hi|Go|Fi|Lu)/, '');
                                                   if (name.includes("Facebook")) return "Facebook";
                                                   if (name.includes("Twitter") || name.includes("TwitterX")) return "Twitter";
                                                   if (name.includes("Instagram")) return "Instagram";
                                                   if (name.includes("Linkedin")) return "LinkedIn";
                                                   if (name.includes("Youtube")) return "YouTube";
                                                   if (name.includes("Github")) return "GitHub";
                                                   if (name.includes("Pinterest")) return "Pinterest";
                                                   if (name.includes("Tiktok")) return "TikTok";
                                                   if (name.includes("Whatsapp")) return "WhatsApp";
                                                   if (name.includes("Telegram")) return "Telegram";
                                                   return name + " Link";
                                              };

                                              return (
                                                   <a
                                                        href={social.path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        key={i}
                                                        className="min-w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer text-white"
                                                        aria-label={getSocialLabel(social.icon)}
                                                   >
                                                        <IconComponent size={18} />
                                                   </a>
                                              );
                                         })
                                   ) : (
                                        [FaFacebookF, RiTwitterXLine, FaInstagram, FaLinkedinIn, CiYoutube].map((Icon, i) => (
                                             <div
                                                  key={i}
                                                  className="min-w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer"
                                             >
                                                  <Icon size={18} strokeWidth={1.2} />
                                             </div>
                                        ))
                                   )}
                              </div>
                         </div>

                         {/* Dynamic Footer Columns */}
                         {footerColumns.map((col, idx) => {
                              const orderClasses = [
                                   "order-3 md:order-1 2xl:order-2",
                                   "order-4 md:order-2 2xl:order-3",
                                   "order-5 md:order-4 2xl:order-4",
                                   "order-6 md:order-5 2xl:order-5",
                              ];
                              const orderClass = orderClasses[idx] || `order-${idx + 3}`;
                              return (
                                   <div key={col._id || idx} className={orderClass}>
                                        <FooterColumn
                                             title={col.title}
                                             links={col.links.map(link => ({ key: link.path, value: link.label }))}
                                        />
                                   </div>
                              );
                         })}

                         {/* App Buttons */}
                         {/* <div className="order-2 md:order-6 2xl:order-6">
                              <h3 className="text-[20px] mb-5">Learn On the Go!</h3>

                              <div className="space-y-3">
                                   <AppButton icon="android" text="Get Android App" />
                                   <AppButton icon="apple" text="Get ios App" />
                              </div>
                         </div> */}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/45 mt-12 pt-12">

                         {/* Dynamic Footer Blocks */}
                         {locations?.length > 0 &&
                              locations.map((block) => (
                                   <FooterTextBlock
                                        key={location / block.slug}
                                        title={block.title}
                                        slug={block.slug}
                                        items={block.items}
                                   />
                              ))
                         }

                    </div>

                    {/* Bottom Divider */}
                    <div className="border-t border-white/45 mt-10 pt-8 text-center">
                         <FooterNav
                              title="Explore"
                              items={
                                   settings && settings.navigation && settings.navigation.length > 0
                                        ? settings.navigation.map(nav => ({ title: nav.itemname, to: nav.itempath }))
                                        : [
                                             { title: "Home", to: "/" },
                                             { title: "Blogs", to: "/category/blogs" },
                                             { title: "Courses", to: "/courses" },
                                             { to: '/about-us', title: 'About us' },
                                             { to: '/disclaimer', title: 'Disclaimer' },
                                             { to: '/privacy-policy', title: 'Privacy Policy' },
                                             { to: '/contact-us', title: 'Contact us' }
                                          ]
                              }
                         />


                         <p className="mt-8 text-[13px] text-white/70">{settings?.copyright || "© 2026 - Shiksha Design All Rights Reserved."}</p>
                    </div>
               </div>
          </footer>
     );
}

function FooterColumn({ title, links }) {
     return (
          <div>
               <h3 className="text-[20px] mb-5">{title}</h3>
               <div className="space-y-3 text-[14px] text-white/70 leading-none flex flex-col">
                    {links.map((link, index) => (
                         <Link href={link.key} key={index} className="hover:text-white/80 transition cursor-pointer">
                              {link.value}
                         </Link>
                    ))}
               </div>
          </div>
     );
}

function AppButton({ icon, text }) {
     return (
          <button className="w-45 h-11 border border-white/70 rounded-lg flex items-center px-5 gap-3 text-white/70 text-[13px] hover:bg-white/5 transition">
               {icon === 'android' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M17.6 9.48l1.43-2.49-.83-.48-1.46 2.54A7.93 7.93 0 0012 7.5c-1.68 0-3.24.52-4.53 1.41L6 6.37l-.83.48 1.43 2.49A7.92 7.92 0 004 15v5h2v-5h1v5h2v-5h6v5h2v-5h1v5h2v-5c0-2.25-.94-4.28-2.4-5.52zM8.5 13A1.5 1.5 0 1110 11.5 1.5 1.5 0 018.5 13zm7 0a1.5 1.5 0 111.5-1.5A1.5 1.5 0 0115.5 13z" />
                    </svg>
               ) : (
                    <AirVent size={18} fill="currentColor" />
               )}
               {text}
          </button>
     );
}

function FooterTextBlock({ title, slug, items }) {
     return (
          <div className="mb-10 last:mb-0">

               <h3 className="text-[18px] mb-5">
                    {title}
               </h3>

               <div className="flex gap-2 flex-wrap">

                    {items?.map((item, index) => (
                         <div
                              key={item.slug || item._id}
                              className="flex items-center gap-2"
                         >

                              <Link href={item?.hero?.title && `/${item.slug || item._id}`}
                                   className="text-[13px] text-white/70 leading-8 hover:text-white transition-colors"
                              >
                                   {item.title}
                              </Link>

                              {index !== items.length - 1 && (
                                   <span className="text-white/45">|</span>
                              )}

                         </div>
                    ))}

               </div>

          </div>
     );
}

function FooterNav({ title, items }) {
     return (
          <div className="mb-6">

               <div className="flex justify-start items-center gap-3 text-[14px] text-white/70 flex-wrap">
                    {items?.map((item, index) => (
                         <div key={index} className="flex items-center gap-3">
                              <Link href={item.to} className="hover:text-white transition-all duration-300 ease-in-out">
                                   {item.title}
                              </Link>
                              {index !== items.length - 1 && (
                                   <span className="text-white/20">|</span>
                              )}
                         </div>
                    ))}
               </div>
          </div>
     );
}
