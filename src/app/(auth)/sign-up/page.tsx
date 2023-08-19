import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { FC } from "react"

import SignUp from "@/components/SignUp"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "self-start -mt-20")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <SignUp />
      </div>
    </div>
  )
}

export default page
