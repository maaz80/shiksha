"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { setToastCallback } from "../utils/toast.js";

const toastStyles = {
     success: {
          icon: CircleCheck,
          bar: "bg-green-500",
          iconClass: "text-green-600 bg-green-50",
     },
     error: {
          icon: CircleAlert,
          bar: "bg-red-500",
          iconClass: "text-red-600 bg-red-50",
     },
     info: {
          icon: Info,
          bar: "bg-primary",
          iconClass: "text-primary bg-orange-50",
     },
};

export default function Toast() {
     const [toast, setToast] = useState(null);

     useEffect(() => {
          let timeoutId;

          setToastCallback(({ message, type = "success" }) => {
               clearTimeout(timeoutId);
               setToast({ message, type });
               timeoutId = setTimeout(() => setToast(null), 3000);
          });

          return () => {
               clearTimeout(timeoutId);
               setToastCallback(null);
          };
     }, []);

     if (!toast) return null;

     const style = toastStyles[toast.type] || toastStyles.info;
     const Icon = style.icon;

     return (
          <div className="fixed top-5 right-4 z-999999 max-w-[calc(100vw-32px)]">
               <div className="relative flex w-82 max-w-full items-start gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 shadow-xl">
                    <div className={`absolute left-0 top-0 h-full w-1 ${style.bar}`} />
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.iconClass}`}>
                         <Icon size={18} />
                    </div>
                    <p className="text-sm leading-5 text-gray-700">{toast.message}</p>
                    <button
                         type="button"
                         onClick={() => setToast(null)}
                         aria-label="Close toast"
                         className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                         <X size={16} />
                    </button>
               </div>
          </div>
     );
}
