import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NAME, ROLE } from "./content";

export const metadata: Metadata = {
  title: `${NAME} | ${ROLE}`,
  description: `${NAME}, ${ROLE.toLowerCase()}. See selected campaigns and send a brand collaboration inquiry.`,
  openGraph: { title: `${NAME} | ${ROLE}`, description: "Soft, real content for brands.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#f9d9df" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
