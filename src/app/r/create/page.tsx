"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"

import { usecustomToast } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import type { CreateSubredditPayload } from "@/lib/validators/subreddit"
import { useMutation } from "@tanstack/react-query"

const Page = () => {
  const [input, setInput] = useState("")
  const router = useRouter()
  const { loginToast } = usecustomToast()

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      }

      const { data } = await axios.post("/api/subreddit", payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exists.",
            description: "Please try another name.",
            variant: "destructive",
          })
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid Subreddit name.",
            description: "Please choose a name between 3 and 21 characters.",
            variant: "destructive",
          })
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }
    },
  })

  return (
    <div className="container mx-auto flex h-full max-w-3xl items-center">
      <div className="relative h-fit w-full space-y-6 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create a community</h1>
        </div>

        <hr className="h-px bg-zinc-500" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="pb-2 text-xs">
            Community names including capitalization cannot be changed.
          </p>

          <div className="relative">
            <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            variant="subtle"
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Page
