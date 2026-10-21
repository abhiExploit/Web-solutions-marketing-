import { AppShell } from '@/components/app/app-shell'
import { Messenger } from '@/components/messages/messenger'

export const metadata = { title: 'Messages — WebSolutions' }

export default function MessagesPage() {
  return (
    <AppShell role="user">
      <h1 className="sr-only">Messages</h1>
      <Messenger />
    </AppShell>
  )
}
