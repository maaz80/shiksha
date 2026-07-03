import "./globals.css";
import Providers from "../components/Providers";
import LayoutShell from "../components/LayoutShell";
import { Open_Sans, Plus_Jakarta_Sans, Poiret_One } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const poiretOne = Poiret_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poiret-one',
});

export const metadata = {
  title: "Shiksha - Master In-Demand Skills & Get Certified",
  description: "Master in-demand skills with industry-leading courses. Get certified, land your dream job, and join thousands of successful graduates.",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${openSans.variable} ${plusJakartaSans.variable} ${poiretOne.variable}`}>
      <body className="min-h-full flex flex-col open-sans">
        <Providers>
          <LayoutShell>
            {children}
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
