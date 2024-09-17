import "./globals.css";
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
