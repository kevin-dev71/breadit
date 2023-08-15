import { Inter } from "next/font/google"

import "@/styles/globals.css"

import { cn } from "@/lib/utils"

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900 antialiased light", inter.className)}>
      <body>{children}</body>
    </html>
  )
}
