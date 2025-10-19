import { auth } from '@/auth'

export default async function layout() {
  const session = await auth()
  return (
    <>
      {session?.user.email}
    </>
  )
}
