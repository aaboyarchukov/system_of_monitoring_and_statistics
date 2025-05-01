import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  subsets: ['latin', "cyrillic", "cyrillic-ext"],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'], // выбери веса, которые используешь
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'Sports Stats',
  description: 'Monitoring and analysis of sports statistics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${montserrat.variable} ${montserrat.variable} antialiased`}
        className={`${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
