"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

import { useToast } from "@/hooks/use-toast"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface UserAuthForm extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthForm) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      // logger
      console.error("from loginWithGoogle", error)
      // toast
      toast({
        title: "Something went wrong",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button onClick={loginWithGoogle} isLoading={isLoading} size="sm" className="w-full">
        {isLoading ? null : <Icons.google className="mr-2 h-4 w-4" />} Google
      </Button>
    </div>
  )
}
export default UserAuthForm
