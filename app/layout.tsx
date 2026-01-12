import type { Metadata } from "next";
// Import font Plus Jakarta Sans hoặc Inter
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";

// Cấu hình font, QUAN TRỌNG NHẤT là dòng 'vietnamese'
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"], // Thêm 'vietnamese' để sửa lỗi font
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kien Community",
  description: "Tools for Creative Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}