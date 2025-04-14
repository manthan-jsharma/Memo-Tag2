"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  //   return (
  //  {hasMounted && (  <NextThemesProvider
  //       attribute="class"
  //       defaultTheme="dark"
  //       enableSystem={false}
  //       disableTransitionOnChange
  //       {...props}
  //     >
  //       {children}
  //         </NextThemesProvider>)
  // }
  //   )
  // }

  return (
    <>
      {hasMounted && (
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          value={{
            dark: "dark",
            light: "light",
          }}
        >
          {children}
        </NextThemesProvider>
      )}
    </>
  );
}
