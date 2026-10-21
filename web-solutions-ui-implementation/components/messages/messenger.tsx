'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Paperclip, Search, Send } from 'lucide-react'
import { sampleConversations, sampleMessages, sampleFreelancers, type ChatMessage } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

export function Messenger() {
  const [activeId, setActiveId] = useState(sampleConversations[0].id)
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>({ [sampleConversations[0].id]: sampleMessages })
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('')

  const active = sampleConversations.find((c) => c.id === activeId)!
  const messages = threads[activeId] ?? []
  const conversations = sampleConversations.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
  const role = sampleFreelancers.find((f) => f.name === active.name)?.role ?? 'Freelancer'

  function send() {
    const text = draft.trim()
    if (!text) return
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    setThreads((t) => ({ ...t, [activeId]: [...(t[activeId] ?? []), { id: crypto.randomUUID(), from: 'me', text, time }] }))
    setDraft('')
  }

  return (
    <div className="grid h-[calc(100svh-8rem)] min-h-[480px] overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[300px_1fr]">
      <aside className="hidden flex-col border-r border-border md:flex">
        <div className="p-4">
          <label className="relative block">
            <span className="sr-only">Search messages</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search messages..."
              className="h-9 w-full rounded-lg border border-input bg-muted/60 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-current={c.id === activeId}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-3 text-left',
                  c.id === activeId ? 'bg-secondary' : 'hover:bg-muted',
                )}
              >
                <Image src={c.avatar || '/placeholder.svg'} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{c.name}</span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{c.preview}</span>
                </span>
                {c.unread > 0 && c.id !== activeId && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {c.unread}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-w-0 flex-col" aria-label={`Conversation with ${active.name}`}>
        <header className="flex items-center gap-3 border-b border-border px-5 py-3">
          <Image src={active.avatar || '/placeholder.svg'} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold">{active.name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </header>

        <ol className="flex flex-1 flex-col gap-4 overflow-y-auto bg-muted/40 p-5">
          {messages.length === 0 && (
            <li className="m-auto text-sm text-muted-foreground">No messages yet. Say hello!</li>
          )}
          {messages.map((m) => (
            <li key={m.id} className={cn('flex max-w-[75%] flex-col gap-1', m.from === 'me' ? 'self-end items-end' : 'self-start')}>
              <p
                className={cn(
                  'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  m.from === 'me' ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm bg-white text-foreground',
                )}
              >
                {m.text}
              </p>
              <span className="text-[11px] text-muted-foreground">{m.time}</span>
            </li>
          ))}
        </ol>

        <form
          className="flex items-center gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <button type="button" aria-label="Attach file" className="rounded-md p-2 text-muted-foreground hover:bg-muted">
            <Paperclip className="size-4" />
          </button>
          <label htmlFor="message" className="sr-only">
            Type a message
          </label>
          <input
            id="message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            className="h-10 flex-1 rounded-lg border border-input px-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="size-4" />
          </button>
        </form>
      </section>
    </div>
  )
}
