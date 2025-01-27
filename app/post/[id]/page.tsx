"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import CommentSection from "@/components/CommentSection"
import { MOCK_POSTS, MOCK_COMMENTS } from "@/utils/mockData"
import { IPost } from "@/types"

export default function PostDetail({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<IPost | null>(null)
    const [comments, setComments] = useState(MOCK_COMMENTS)
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    useEffect(() => {
        const foundPost = MOCK_POSTS.find(p => p.postId === params.id) || MOCK_POSTS[0]
        setPost(foundPost)
        setIsLiked(foundPost.isLiked || false)
        setLikesCount(foundPost.likes)
    }, [params.id])

    if (!post) return null

    const handleLikeClick = () => {
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    }

    const handleAddComment = (content: string) => {
        const newComment = {
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