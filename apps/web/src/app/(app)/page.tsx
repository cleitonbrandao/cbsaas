import { auth } from '@/auth/auth'
import { Header } from '@/components/headers'

export default async function Home() {
  return (
    <div className="py-4">
      <Header />
      <main></main>
    </div>
  )
}
