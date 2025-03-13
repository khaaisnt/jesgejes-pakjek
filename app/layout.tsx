import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/ReactToastify.css"

export const metadata: Metadata = {
  title: "Sekopling Jesgejes",
  description: "Platform untuk memesan tiket kereta api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
