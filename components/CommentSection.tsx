'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IComment } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import { MoreHorizontal, MessageCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  postId: string
  initialComments?: IComment[]
}

export default function CommentSection({ postId, initialComments = [] }: Props) {
  const [comments, setComments] = useState<IComment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: IComment = {
        id: Date.now().toString(),
        content: newComment,
        userName: "현재 사용자", // 실제로는 로그인된 사용자 정보 사용
        userProfile: "/default-avatar.png",
        createdAt: new Date().toISOString(),
        parentId: replyTo
      }
      setComments(prev => [comment, ...prev])
      setNewComment("")
      setReplyTo(null)
    }
  }

  const handleEdit = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId)
    if (comment) {
      setEditingId(commentId)
      setEditContent(comment.content)
    }
  }

  const handleDelete = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  const handleUpdate = (commentId: string) => {
    if (editContent.trim()) {
      setComments(prev => prev.map(c => 
        c.id === commentId ? { ...c, content: editContent } : c
      ))
      setEditingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
          className="flex-1"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          작성
        </Button>
      </form>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.userProfile} alt={comment.userName} />
              <AvatarFallback>{comment.userName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { 
                      addSuffix: true,
                      locale: ko 
                    })}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(comment.id)}>
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(comment.id)}>
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {editingId === comment.id ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleUpdate(comment.id)}>
                    저장
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    취소
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1"
                    onClick={() => setReplyTo(comment.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    답글
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 