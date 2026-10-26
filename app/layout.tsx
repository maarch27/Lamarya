import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NAME } from "./content";

export const metadata: Metadata = {
  metadataBase: new URL("https://drlamarya.com"),
  title: `${NAME} ♡ UGC creator in Paris`,
  description: "Hi, I'm Lamara! I film cozy, honest UGC videos and photos for beauty, fashion, health, travel and tech brands.",
  openGraph: { title: `${NAME} ♡ UGC creator in Paris`, description: "Soft, real content for brands.", type: "website", url: "https://drlamarya.com" },
};

export const viewport: Viewport = { themeColor: "#f9d9df" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
