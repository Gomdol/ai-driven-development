"use client"

import { useState } from "react"
import { IPost, IComment } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Bookmark } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CommentSection from "@/components/CommentSection"
import Link from "next/link"
import Image from "next/image"

// 목업 댓글 데이터
const MOCK_COMMENTS: IComment[] = [
    {
        id: "1",
        postId: "1",
        content: "정말 멋진 작품이네요!",
        userName: "댓글러1",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment1",
        createdAt: "2024-03-20T10:00:00Z"
    },
    // ... 더 많은 목업 댓글 추가 가능
]

export default function CommunityFeedCard({ post }: { post: IPost }) {
    const [isLiked, setIsLiked] = useState(post.isLiked || false)
    const [likesCount, setLikesCount] = useState(post.likes)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [comments, setComments] = useState<IComment[]>(MOCK_COMMENTS)

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    }

    const handleCommentClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsCommentOpen(true)
    }

    const handleAddComment = (content: string) => {
        const newComment: IComment = {
            id: `comment-${Date.now()}`,
            postId: post.postId,
            content,
            userName: "현재 사용자",
            userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
            createdAt: new Date().toISOString()
        }
        setComments(prev => [newComment, ...prev])
    }

    return (
        <>
            <Link href={`/post/${post.postId}`} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                        <div className="relative aspect-square">
                            <Image
                                src={post.imageURL}
                                alt="Generated image"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={post.userProfile} alt={post.userName} />
                                <AvatarFallback>{post.userName[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{post.userName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handleLikeClick}
                                className="flex items-center gap-1"
                            >
                                <Heart 
                                    className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                                />
                                <span className="text-sm">{likesCount}</span>
                            </button>
                            <button 
                                onClick={handleCommentClick}
                                className="flex items-center gap-1"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{comments.length}</span>
                            </button>
                            <div className="flex items-center gap-1">
                                <Bookmark className="w-4 h-4" />
                                <span className="text-sm">{post.scraps}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>

            <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>댓글</DialogTitle>
                    </DialogHeader>
                    <CommentSection
                        postId={post.postId}
                        comments={comments}
                        onAddComment={handleAddComment}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
} 