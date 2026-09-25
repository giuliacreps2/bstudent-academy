import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Plus_Jakarta_Sans } from "next/font/google";
import { readingInitScript } from "@/constants/account";
import { ReadingArea } from "@/components/ReadingArea";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

// Font "Alta leggibilità": preload disattivato, si scarica solo se qualcuno lo usa
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-atkinson",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "BStudent",
  description: "Latino e greco senza difficoltà",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: lo script qui sotto aggiunge gli attributi
    // data-reading-* a <html> prima che React faccia l'hydration.
    <html
      lang="it"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${atkinson.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: readingInitScript }} />
      </head>

      <body className="min-h-full flex flex-col">
        {" "}
        <ReadingArea>{children}</ReadingArea>
      </body>
    </html>
  );
}
