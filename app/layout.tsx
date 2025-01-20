import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/ReactToastify.css";

export const metadata: Metadata = {
  title: "Tiket Kereta Api",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
