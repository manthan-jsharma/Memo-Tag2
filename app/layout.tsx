import type React from "react";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "MemoTag - AI-Powered Dementia Care Platform",
  description:
    "MemoTag is an AI-powered platform designed to support dementia patients and their caregivers, providing memory assistance when it matters most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
