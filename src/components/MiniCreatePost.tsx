"use client"

import { usePathname, useRouter } from "next/navigation"
import type { Session } from "next-auth"
import { ImageIcon, Link2 } from "lucide-react"
import type { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import UserAvatar from "@/components/UserAvatar"

interface MiniCreatePostProps {
  session: Session | null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="flex h-full justify-between gap-6 px-6 py-4">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user?.name || null,
              image: session?.user?.image || null,
            }}
          />

          <span className="absolute bottom-0 right-0 h-3 w-3  rounded-full bg-green-500 outline outline-2 outline-white" />
        </div>

        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="Create post"
        />

        <Button variant="ghost" onClick={() => router.push(pathname + "/submit")}>
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button variant="ghost" onClick={() => router.push(pathname + "/submit")}>
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  )
}

export default MiniCreatePost
