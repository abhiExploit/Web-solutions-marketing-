'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { AuthField, SocialButtons } from '@/components/auth/auth-layout'

export function SignupForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const update = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Create Your Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Get started with your free account.</p>

      <div className="mt-8 flex flex-col gap-3">
        <SocialButtons prefix="Continue with " />
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          router.push('/dashboard')
        }}
      >
        <AuthField id="name" label="Full Name" placeholder="Enter your full name" value={form.name} onChange={update('name')} autoComplete="name" />
        <AuthField id="email" label="Email address" type="email" placeholder="Enter your email" value={form.email} onChange={update('email')} autoComplete="email" />
        <AuthField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password"
          value={form.password}
          onChange={update('password')}
          autoComplete="new-password"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
        />
        <button
          type="submit"
          className="mt-2 h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {'Already have an account? '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </>
  )
}
