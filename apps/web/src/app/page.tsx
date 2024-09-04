import { Button } from '@/components/ui/button'
import { GetProfile } from 'http/get-profile';
export default async function Home() {
  const { user } = await GetProfile()
  return <pre>{ JSON.stringify(user, null, 2)}</pre>
}
