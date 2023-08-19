"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/Button"

const CloseModal = () => {
  const router = useRouter()

  return (
    <Button
      aria-label="close modal"
      variant="subtle"
      className="h-6 w-6 rounded-md p-0"
      onClick={() => router.back()}
    >
      <X className="h-4 w-4" />
    </Button>
  )
}
export default CloseModal
