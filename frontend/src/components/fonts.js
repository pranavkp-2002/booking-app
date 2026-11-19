import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

/** Put on a page wrapper: loads Inter (body) + Space Grotesk (headings). */
export const slotlyFonts = `${inter.variable} ${spaceGrotesk.variable} font-[family-name:var(--font-inter)]`;

/** Heading font class. */
export const headingFont = "font-[family-name:var(--font-space-grotesk)]";
