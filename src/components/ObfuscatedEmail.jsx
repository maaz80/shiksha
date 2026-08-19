"use client";

import { useEffect, useState } from "react";

/**
 * ObfuscatedEmail Component
 * Prevents automated email scrapers & spam bots from scraping plain text emails
 * while keeping emails 100% functional and clickable for human visitors.
 */
export default function ObfuscatedEmail({
     email = "info@weekendux.in",
     className = "",
     subject = "",
     children
}) {
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     const cleanEmail = (email || "info@weekendux.in").trim();
     const [user, domain] = cleanEmail.includes("@") ? cleanEmail.split("@") : ["info", "weekendux.in"];

     const mailtoHref = mounted
          ? `mailto:${user}@${domain}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
          : "#";

     return (
          <a
               href={mailtoHref}
               className={className}
               onClick={(e) => {
                    if (!mounted) {
                         e.preventDefault();
                         window.location.href = `mailto:${user}@${domain}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
                    }
               }}
          >
               {children || (mounted ? `${user}@${domain}` : `${user}[at]${domain}`)}
          </a>
     );
}
