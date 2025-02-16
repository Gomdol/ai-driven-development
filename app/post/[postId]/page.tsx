"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CommentSection from "@/components/CommentSection"
import { MOCK_POSTS } from "@/utils/mocks/posts"
import { IPost, IComment } from "@/types"

// 목업 데이터
const MOCK_COMMENTS: IComment[] = [
  {
    id: '1',
    postId: '1',
    content: '멋진 이미지네요!',
    userName: '사용자1',
    userProfile: '/default-avatar.png',
    createdAt: new Date().toISOString(),
  },
  // ... 더 많은 목업 댓글 데이터
]

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  const [post, setPost] = useState<IPost | null>(null)
  const [comments, setComments] = useState(MOCK_COMMENTS)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    const foundPost = MOCK_POSTS.find((p: IPost) => p.postId === params.postId) || MOCK_POSTS[0]
    setPost(foundPost)
    setIsLiked(foundPost.isLiked || false)
    setLikesCount(foundPost.likes)
  }, [params.postId])

  if (!post) return null

  return (
    <main className="min-h-screen py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            돌아가기
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={post.imageURL}
                  alt="Generated image"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.userProfile} alt={post.userName} />
                  <AvatarFallback>{post.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{post.userName}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">댓글</h3>
                <CommentSection
                  postId={params.postId}
                  initialComments={MOCK_COMMENTS}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
} 