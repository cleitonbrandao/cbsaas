'use client'

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { queryClient } from "@/lib/react-query";


export function Provideres ({ children }: {children: ReactNode}) {
    return(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}