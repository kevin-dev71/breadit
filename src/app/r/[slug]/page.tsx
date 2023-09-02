import { notFound } from "next/navigation"

import type { ExtendedPost } from "@/types/db"

import MiniCreatePost from "@/components/MiniCreatePost"
import PostFeed from "@/components/PostFeed"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

interface PagePros {
  params: {
    slug: string
  }
}

const page = async ({ params }: PagePros) => {
  const { slug } = params

  const session = await getAuthSession()

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: { author: true, votes: true, comments: true, subreddit: true },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  })

  if (!subreddit) return notFound()

  return (
    <>
      <h1 className="h-14 text-3xl font-bold md:text-4xl">r/{subreddit.name}</h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts as ExtendedPost[]} subredditName={subreddit.name} />
    </>
  )
}
export default page
