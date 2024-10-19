
import { Header } from "@/components/headers"
import { Tabs } from "@/components/tabs"

export default async function OrgLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return(
        <div>
            <div className="p-6">
                <Header />
                <Tabs />
            </div>

            <main className="mx-auto w-full max-w-[1200px] p-4">
                {children}
            </main>
        </div>
    )
}