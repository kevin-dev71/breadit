import Image from "next/image"
import type { User } from "next-auth"
import type { FC } from "react"

import { Icons } from "@/components/Icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { AvatarProps } from "@radix-ui/react-avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image fill src={user.image} alt={"profile image"} referrerPolicy="no-referrer" />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
