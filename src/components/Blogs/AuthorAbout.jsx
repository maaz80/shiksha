"use client";

import React from "react";
import Image from "next/image";
const FaXTwitter = ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const FaLinkedinIn = ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.37 1.04-2.47 2.41-2.47s2.34 1.1 2.34 2.47v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
);

export default function AuthorAbout({ author = {}, blog = {} }) {
    const isObject = typeof author === "object" && author !== null;

    const name = (isObject ? author.name : author) || blog.author || "Weekend UX";
    const designation = (isObject ? author.designation : "") || blog.authorDesignation || "";
    const bio = (isObject ? author.bio : "") || blog.authorBio || "We help aspiring designers build real-world skills through hands-on weekend workshops, expert mentorship, and industry-ready projects.";
    const avatarUrl = (isObject ? author.avatar : "") || blog.authorImage || null;

    const social = (isObject ? (author.socialLinks || author.social) : {}) || blog.authorSocial || {};
    const twitterUrl = (isObject ? author.twitter : "") || blog.authorTwitter || social.twitter || null;
    const linkedinUrl = (isObject ? author.linkedin : "") || social.linkedin || null;

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] my-6 sm:my-10">
            {/* Top row: Avatar + Info + Socials */}
            <div className="flex flex-row items-center gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white overflow-hidden bg-primary/10 flex items-center justify-center relative">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={name}
                                width={72}
                                height={72}
                                unoptimized
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <svg
                                className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Info + Socials row */}
                <div className="flex-1 min-w-0 flex flex-row items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-primary mb-0.5">
                            About The Author
                        </p>
                        <h2 className="font-urbanist font-bold text-base sm:text-xl text-primary leading-tight truncate">
                            {name} {designation && <span className="text-xs sm:text-sm font-normal text-slate-500 ml-1">({designation})</span>}
                        </h2>
                    </div>

                    {/* Social Icons */}
                    {(twitterUrl || linkedinUrl) && (
                        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
                            {twitterUrl && (
                                <a
                                    href={twitterUrl.startsWith("http") ? twitterUrl : `https://${twitterUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} on X (Twitter)`}
                                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-primary text-white flex items-center justify-center transition-all duration-200 hover:bg-primary/90 hover:scale-105 shadow-xs"
                                >
                                    <FaXTwitter size={13} className="sm:text-[15px]" />
                                </a>
                            )}
                            {linkedinUrl && (
                                <a
                                    href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} on LinkedIn`}
                                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-primary text-white flex items-center justify-center transition-all duration-200 hover:bg-primary/90 hover:scale-105 shadow-xs"
                                >
                                    <FaLinkedinIn size={13} className="sm:text-[15px]" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Bio */}
            {bio && (
                <p className="mt-3 text-xs sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                    {bio}
                </p>
            )}
        </div>
    );
}
