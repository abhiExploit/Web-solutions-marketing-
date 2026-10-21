'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CloudUpload, ImageIcon } from 'lucide-react'
import { templateCategories } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

function DropZone({
  id,
  icon: Icon,
  label,
  hint,
  accept,
  fileName,
  onFile,
}: {
  id: string
  icon: typeof CloudUpload
  label: string
  hint: string
  accept: string
  fileName: string | null
  onFile: (name: string | null) => void
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-muted/40 px-4 py-8 text-center hover:border-primary hover:bg-secondary/40"
    >
      <Icon className="size-8 text-primary" aria-hidden="true" />
      <span className="text-sm font-medium">{fileName ?? label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0]?.name ?? null)}
      />
    </label>
  )
}

export function UploadTemplateForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [isPaid, setIsPaid] = useState(true)
  const [price, setPrice] = useState('1599')
  const [file, setFile] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <form
      className="flex max-w-3xl flex-col gap-5 rounded-xl border border-border bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault()
        router.push('/seller/templates')
      }}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tpl-name" className="text-sm font-medium">
          Template Name
        </label>
        <input id="tpl-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter template name" className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tpl-category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="tpl-category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={cn(inputClass, !category && 'text-muted-foreground')}
        >
          <option value="" disabled>
            Select category
          </option>
          {templateCategories.slice(1).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Price</span>
        <div className="flex flex-wrap items-center gap-3">
          <div role="radiogroup" aria-label="Pricing" className="flex rounded-lg border border-input p-1">
            {[
              { value: false, label: 'Free' },
              { value: true, label: 'Paid' },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                role="radio"
                aria-checked={isPaid === opt.value}
                onClick={() => setIsPaid(opt.value)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium',
                  isPaid === opt.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {isPaid && (
            <label className="relative">
              <span className="sr-only">Price in INR</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={cn(inputClass, 'w-32 pl-7')}
              />
            </label>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Template File (ZIP)</span>
          <DropZone
            id="tpl-file"
            icon={CloudUpload}
            label="Click to upload or drag and drop"
            hint="ZIP, RAR (Max 50MB)"
            accept=".zip,.rar"
            fileName={file}
            onFile={setFile}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Preview Image</span>
          <DropZone
            id="tpl-preview"
            icon={ImageIcon}
            label="Click to upload or drag and drop"
            hint="PNG, JPG (Max 5MB)"
            accept="image/png,image/jpeg"
            fileName={preview}
            onFile={setPreview}
          />
        </div>
      </div>

      <button type="submit" className="h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        Upload Template
      </button>
    </form>
  )
}
