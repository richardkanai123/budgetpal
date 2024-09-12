import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Customui/Header";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
	title: "Budget_Pal",
	description: " A budgeting app for tracking expenses and income.",
	authors: [
		{ name: "richard kanai", url: "https://github.com/richardkanai123" },
	],
	keywords: [
		"budget",
		"expense",
		"income",
		"tracker",
		"finance",
		"website",
		"nextjs",
	],
	creator: "richardkanai",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='relative container max-w-screen-md overflow-x-hidden mx-auto'>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

         <header className='z-10 sticky top-0 bottom-0 left-0 w-full max-w-screen-md mx-auto flex flex-col px-1 py-0 border-b border-gray-300 dark:border-slate-700 bg-blend-overlay backdrop-blur-xl  '>
								<Header/>
							</header>

       <main className='w-full min-h-screen pt-4 my-0 mx-auto '>
								{children}
            </main>
         </ThemeProvider>
            </div>
      </body>
    </html>
  );
}
