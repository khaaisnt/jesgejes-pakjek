import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/ReactToastify.css"

export const metadata: Metadata = {
  title: "Sekopling JesGejes",
  description: "Sekopling Tiket Kereta",
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
