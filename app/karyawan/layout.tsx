import type { Metadata } from "next";
import "react-toastify/ReactToastify.css";
import EmployeeTemplate from "@/components/EmployeeTemplate";

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
   <EmployeeTemplate>
    {children}
   </EmployeeTemplate>
  );
}
