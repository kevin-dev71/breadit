import type { User } from "next-auth"
import type { FC } from "react"

import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/UserAvatar"

interface UserAccountNavProps {
  user: Pick<User, "name" | "email" | "image">
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export default UserAccountNav
