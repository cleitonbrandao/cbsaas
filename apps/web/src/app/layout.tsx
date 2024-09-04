import "./globals.css";
import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  if(isAuthenticated()){
    // redirect('/')
  }

  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
