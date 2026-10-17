import { type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] p-6 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
