'use client'

import { IPost } from '@/types'
import Link from 'next/link'
import { Heart, MessageSquare, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { CommentModal } from './CommentModal'

interface Props {
  post: IPost
  onUpdate: (updates: Partial<IPost>) => void
}

export function CommunityFeedCard({ post, onUpdate }: Props) {
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [isScrapped, setIsScrapped] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    const newLikes = isLiked ? likes - 1 : likes + 1
    setLikes(newLikes)
    onUpdate({ likes: newLikes })
  }

  const handleScrap = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsScrapped(!isScrapped)
    const newScraps = isScrapped ? post.scraps - 1 : post.scraps + 1
    onUpdate({ scraps: newScraps })
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCommentModalOpen(true)
  }

  return (
    <>
      <Link href={`/post/${post.postId}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-square">
            <img
              src={post.imageURL}
              alt={`Post by ${post.userName}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={post.userProfile}
                alt={post.userName}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{post.userName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className="w-4 h-4 mr-1" />
                {likes}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCommentClick}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                {post.comments}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleScrap}
                className={isScrapped ? 'text-blue-500' : ''}
              >
                <Bookmark className="w-4 h-4 mr-1" />
                {post.scraps}
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={post.postId}
        initialComments={post.commentList || []}
      />
    </>
  )
}