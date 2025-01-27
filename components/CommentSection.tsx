import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IComment, ICommentSectionProps } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

export default function CommentSection({ postId, comments, onAddComment }: ICommentSectionProps) {
    const [newComment, setNewComment] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newComment.trim()) {
            onAddComment(newComment)
            setNewComment("")
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.userProfile} alt={comment.userName} />
                            <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{comment.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(comment.createdAt), { 
                                        addSuffix: true,
                                        locale: ko 
                                    })}
                                </span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1"
                />
                <Button type="submit" disabled={!newComment.trim()}>
                    작성
                </Button>
            </form>
        </div>
    )
} 