import type { Metadata } from "next"
import EmployeeTemplate from "@/components/modal/EmployeeTemplate";

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
   <EmployeeTemplate>
    {children}
   </EmployeeTemplate>
  );
}
