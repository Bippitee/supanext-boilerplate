import {
  Inter as fontSans,
  Share_Tech_Mono as fontMono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const sans = fontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = fontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata = {
  title: "Supanext",
  description:
    "Brought to yo by Fox & Bear, boilerplate for Next.js with Tailwind CSS and Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          sans.variable,
          mono.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="container mx-auto">
            <Header />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
