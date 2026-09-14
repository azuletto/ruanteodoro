"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export function Reveal({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  disabled = false,
}: {
  children: ReactNode
  animation?: "none" | "fade-up" | "fade-in" | "scale-in"
  delay?: number
  className?: string
  disabled?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (disabled || !el || animation === "none") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animation, disabled])

  if (disabled || animation === "none") {
    return <div className={className}>{children}</div>
  }

  const hiddenStyles: Record<string, string> = {
    "fade-up": "translate-y-6 opacity-0",
    "fade-in": "opacity-0",
    "scale-in": "scale-[0.96] opacity-0",
  }

  const visibleStyles: Record<string, string> = {
    "fade-up": "translate-y-0 opacity-100",
    "fade-in": "opacity-100",
    "scale-in": "scale-100 opacity-100",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        visible ? visibleStyles[animation] ?? visibleStyles["fade-up"] : hiddenStyles[animation] ?? hiddenStyles["fade-up"]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
