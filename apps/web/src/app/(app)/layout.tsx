import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/headers";

export default function AppLayout({
    sheet,
    children,
}: Readonly<{
    sheet: React.ReactNode
    children: React.ReactNode
}>) {
    
  if(!isAuthenticated()){
    redirect('/auth/sign-in')
  }

  return(
    <>{children}{sheet}</>
  )
}