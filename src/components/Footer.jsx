"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from '../assets/shiksha-logo.webp';
import { getLocations } from '../utils/locations';
import { API_URL, fetchWithFallback } from '../utils/api';
function SocialIcon({ iconName, size = 18, className = "" }) {
     if (!iconName) return null;
     const lower = iconName.toLowerCase();

     if (lower.includes("facebook")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
               </svg>
          );
     }
     if (lower.includes("twitter")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
               </svg>
          );
     }
     if (lower.includes("instagram")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
               </svg>
          );
     }
     if (lower.includes("linkedin")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.37 1.04-2.47 2.41-2.47s2.34 1.1 2.34 2.47v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
               </svg>
          );
     }
     if (lower.includes("youtube")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
               </svg>
          );
     }
     if (lower.includes("github")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
               </svg>
          );
     }
     if (lower.includes("whatsapp")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.057-.979-.277-.1-.478-.15-.678.15-.2.3-.777.978-.953 1.179-.176.2-.351.225-.652.075-.301-.15-1.272-.469-2.424-1.496-.897-.798-1.502-1.784-1.678-2.085-.176-.301-.019-.464.13-.613.134-.134.301-.351.451-.526.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.244-.585-.494-.506-.677-.516-.176-.008-.377-.01-.577-.01-.2 0-.526.075-.802.376-.276.3-1.053 1.03-1.053 2.512 0 1.482 1.078 2.91 1.228 3.11.15.2 2.121 3.24 5.138 4.542.718.309 1.278.494 1.716.633.721.23 1.377.197 1.896.12.578-.086 1.78-.727 2.03-1.43.25-.703.25-1.303.175-1.43-.075-.128-.276-.203-.577-.353zM12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.113 1.523 5.842L0 24l6.326-1.492A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.849 0-3.578-.496-5.073-1.365l-.364-.21-3.766.888.905-3.666-.231-.377A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
               </svg>
          );
     }
     if (lower.includes("telegram")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm5.262 7.172c.11.002.3.025.4.103a.35.35 0 0 1 .116.236c.01.127-.006.27-.03.35-.38 1.974-1.528 8.73-2.106 11.517-.06.29-.17.43-.306.45-.19.03-.35-.06-.5-.16l-3.3-2.435-1.59 1.53c-.17.17-.32.32-.57.32-.23 0-.39-.14-.49-.33l-1.24-4.08-3.6-1.125c-.32-.1-.33-.33-.02-.48l14.07-5.43c.15-.06.31-.08.45-.06z"/>
               </svg>
          );
     }
     if (lower.includes("globe") || lower.includes("global")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
               </svg>
          );
     }
     if (lower.includes("mail") || lower.includes("envelope")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
               </svg>
          );
     }
     if (lower.includes("phone")) {
          return (
               <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
               </svg>
          );
     }
     return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
               <circle cx="12" cy="12" r="10"/>
               <line x1="2" y1="12" x2="22" y2="12"/>
               <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
     );
}

export default function Footer({ initialLocations = [] }) {
     const [locations, setLocations] = useState(initialLocations);
     const defaultColumns = [
          {
               title: "Company",
               links: [
                    { label: "About us", path: "/about-us" },
                    { label: "Courses", path: "/courses" },
                    { label: "Disclaimer", path: "/disclaimer" },
                    { label: "Privacy Policy", path: "/privacy-policy" },
                    { label: "Contact us", path: "/contact-us" },
                    { label: "Blogs", path: "/blog" },
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
          let isMounted = true;
          const fetchLocations = async () => {
               try {
                    const data = await getLocations();
                    if (isMounted && Array.isArray(data) && data.length > 0) setLocations(data);
               } catch (e) {
                    console.error("Failed to fetch locations in Footer", e);
               }
          };

          const fetchFooterColumns = async () => {
               try {
                    const res = await fetchWithFallback("/footer-columns");
                    if (res && res.ok) {
                         const data = await res.json();
                         if (isMounted && Array.isArray(data) && data.length > 0) {
                              setFooterColumns(data);
                         }
                    }
               } catch (err) {
                    console.error("Failed to fetch footer columns", err);
               }
          };

          const fetchFooterSettings = async () => {
               try {
                    const res = await fetchWithFallback("/footer-columns/global");
                    if (res && res.ok) {
                         const data = await res.json();
                         if (isMounted) setSettings(data);
                    }
               } catch (err) {
                    console.error("Failed to fetch global footer settings", err);
               }
          };

          fetchLocations();
          fetchFooterColumns();
          fetchFooterSettings();

          return () => { isMounted = false; };
     }, []);

     return (
          <footer className="bg-dark-blue text-white w-full">
               <div className="mx-auto max-w-330 px-6 md:px-9 2xl:px-10 pt-12 md:pt-14 2xl:pt-16 pb-5">

                    {/* TOP GRID */}
                    <div className="
          grid gap-y-10 gap-x-8
          grid-cols-1
          md:grid-cols-3
          2xl:grid-cols-5
        ">

                         {/* Logo & Social Links */}
                         <div className="order-1 md:order-3 2xl:order-1 h-card vcard">
                              <Link href="/" className="inline-block mb-6 cursor-pointer p-name fn u-url url" aria-label="Shiksha Home">
                                   <img
                                        src={logo?.src || logo || '/images/shiksha-logo.webp'}
                                        alt="Shiksha Logo"
                                        width="140"
                                        height="40"
                                        className="h-10 w-auto object-contain brightness-0 invert u-logo logo"
                                   />
                              </Link>
                              <span className="p-org org hidden">Shiksha Design</span>

                               <div className="flex gap-3">
                                    {settings && settings.socials && settings.socials.length > 0 ? (
                                         settings.socials.map((social, i) => {
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
                                                        <SocialIcon iconName={social.icon} size={18} />
                                                   </a>
                                              );
                                         })
                                    ) : (
                                         ["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"].map((name, i) => (
                                              <div
                                                   key={i}
                                                   className="min-w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer text-white"
                                              >
                                                   <SocialIcon iconName={name} size={18} />
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
                                             links={col.links ? col.links.map(link => ({ key: link.path, value: link.label })) : []}
                                        />
                                   </div>
                              );
                         })}

                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/45 mt-12 pt-12">

                         {/* Dynamic Footer Blocks */}
                         {locations?.length > 0 &&
                              locations.map((block) => (
                                   <FooterTextBlock
                                        key={block.slug || block._id}
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
                                             { title: "Blogs", to: "/blog" },
                                             { title: "Courses", to: "/courses" },
                                             { to: '/about-us', title: 'About us' },
                                             { to: '/disclaimer', title: 'Disclaimer' },
                                             { to: '/terms-and-conditions-enrolment', title: 'Terms & Conditions' },
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
               <h2 className="text-[20px] mb-5">{title}</h2>
               <div className="space-y-3 text-[14px] text-white/70 leading-none flex flex-col">
                    {links.map((link, index) => (
                         <Link href={link.key || "/"} key={index} className="hover:text-white/80 transition cursor-pointer">
                              {link.value}
                         </Link>
                    ))}
               </div>
          </div>
     );
}

function FooterTextBlock({ title, slug, items }) {
     return (
          <div className="mb-10 last:mb-0">

               <h2 className="text-[18px] mb-5">
                    {title}
               </h2>

               <div className="flex gap-2 flex-wrap">

                    {items?.map((item, index) => (
                         <div
                              key={item.slug || item._id || index}
                              className="flex items-center gap-2"
                         >

                              <Link href={item?.hero?.title ? `/location/${item.slug || item._id}` : "/"}
                                   className="text-[13px] text-white/70 leading-8 hover:text-white transition-colors"
                              >
                                   {item.title}
                              </Link>

                              {index !== items.length - 1 && (
                                   <span className="text-white/70">|</span>
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

               <div className="flex justify-center items-center gap-3 text-[14px] text-white/70 flex-wrap">
                    {items?.map((item, index) => (
                         <div key={index} className="flex items-center gap-3">
                              <Link href={item.to || "/"} className="hover:text-white transition-all duration-300 ease-in-out">
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
