import type { Metadata } from "next";
import "./font.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MEMOIR | Sriram's Personal Journal",
  description: "An archive of traces lost to light - a personal journal of memories and moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/futura-pt"
        />
      </head>
      <body className="antialiased font-futura">
        {children}
      </body>
    </html>
  );
}
