'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { AuthField, SocialButtons } from '@/components/auth/auth-layout'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
      <p className="mt-2 text-sm text-muted-foreground">Login to your account to continue.</p>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          router.push('/dashboard')
        }}
      >
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
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
        <div className="flex justify-end">
          <Link href="#" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Login
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with
        <span className="h-px flex-1 bg-border" />
      </div>
      <SocialButtons />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </>
  )
}
