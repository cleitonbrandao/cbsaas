import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ThemeProvider} from 'next-themes'
import { Provideres } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provideres>{children}</Provideres>
      </body>
    </html>
  );
}
