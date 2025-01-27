"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import CommentSection from "@/components/CommentSection"
import { IPost, IComment } from "@/types"

// 목업 데이터
const MOCK_POST: IPost = {
    postId: "1",
    imageURL: "https://picsum.photos/800/800",
    userName: "창작자1",
    userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    createdAt: "2024-03-20",
    likes: 120,
    comments: 15,
    scraps: 30,
    isLiked: false
}

const MOCK_COMMENTS: IComment[] = [
    {
        id: "1",
        postId: "1",
        content: "정말 멋진 작품이네요!",
        userName: "댓글러1",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment1",
        createdAt: "2024-03-20T10:00:00Z"
    },
    {
        id: "2",
        postId: "1",
        content: "어떤 프롬프트를 사용하셨나요?",
        userName: "댓글러2",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment2",
        createdAt: "2024-03-20T11:30:00Z"
    },
    {
        id: "3",
        postId: "1",
        content: "색감이 너무 예쁘네요 👍",
        userName: "댓글러3",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment3",
        createdAt: "2024-03-20T12:15:00Z"
    }
]

export default function PostDetail({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<IPost>(MOCK_POST)
    const [comments, setComments] = useState<IComment[]>(MOCK_COMMENTS)
    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likesCount, setLikesCount] = useState(post.likes)

    const handleLikeClick = () => {
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
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

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            alert('링크가 복사되었습니다!')
        } catch (err) {
            console.error('링크 복사 실패:', err)
        }
    }

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
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
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
                                <Button variant="ghost" size="icon" onClick={handleShare}>
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={handleLikeClick}
                                    className="flex items-center gap-1"
                                >
                                    <Heart 
                                        className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                                    />
                                    <span>{likesCount}</span>
                                </Button>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{comments.length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bookmark className="w-4 h-4" />
                                    <span className="text-sm">{post.scraps}</span>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-medium mb-4">댓글</h3>
                                <CommentSection
                                    postId={post.postId}
                                    comments={comments}
                                    onAddComment={handleAddComment}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    )
} 