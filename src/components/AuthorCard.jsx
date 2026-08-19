import React from "react";
import { FaTwitter } from "react-icons/fa";
import authorLogo from '../assets/author-logo.webp';

export default function AuthorCard({ author, blog }) {
  const blogData = blog || {};

  let name = "";
  let designation = "";
  let avatar = "";
  let bio = "";
  let twitter = "";

  if (typeof author === "object" && author !== null) {
    name = author.name || blogData.author || "Author";
    designation = author.designation || blogData.authorDesignation || "";
    avatar = author.avatar || blogData.authorImage || "";
    bio = author.bio || blogData.authorBio || "";
    const social = author.socialLinks || author.social || blogData.authorSocial || {};
    twitter = social.twitter || blogData.authorTwitter || "";
  } else {
    name = author || blogData.author || "Author Name";
    designation = blogData.authorDesignation || "";
    avatar = blogData.authorImage || "";
    bio = blogData.authorBio || "";
    const social = blogData.authorSocial || {};
    twitter = social.twitter || blogData.authorTwitter || (typeof social === "string" ? social : "");
  }

  return (
    <div className="w-full rounded-2xl border border-[#D6DEE6] px-6 py-6 md:px-10 md:py-8 text-secondary my-8 bg-white shadow-xs">
      {/* TITLE */}
      <h2 className="text-[22px] md:text-[32px] font-bold mb-6 text-secondary">
        Author
      </h2>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* AVATAR */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
          <img
            src={avatar || authorLogo.src || authorLogo}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = authorLogo.src || authorLogo;
            }}
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex-1">
          {/* NAME & DESIGNATION */}
          <h3 className="text-[18px] md:text-[20px] font-bold mb-2 text-secondary">
            {name}{" "}
            {designation && (
              <span className="text-[16px] md:text-[18px] text-gray-500 font-medium">
                ({designation})
              </span>
            )}
          </h3>

          {/* DESCRIPTION / BIO */}
          <p className="text-[15px] md:text-[16px] leading-7 mb-5 text-gray-600">
            {bio || "Comprehensive knowledge sharing and educational guides."}
          </p>

          {/* SOCIAL LINKS (TWITTER ONLY) */}
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#5B6B7C] font-semibold">Follow:</span>

            {twitter ? (
              <a
                href={twitter.startsWith("http") ? twitter : `https://${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <FaTwitter size={18} />
              </a>
            ) : (
              <span className="text-gray-400">
                <FaTwitter size={18} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}