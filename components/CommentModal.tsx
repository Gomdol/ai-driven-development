'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CommentSection from "./CommentSection"
import { IComment } from "@/types"
import { ICommentModalProps } from '@/types'

export function CommentModal({ isOpen, onClose, postId, initialComments }: ICommentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>댓글</DialogTitle>
        </DialogHeader>
        <CommentSection postId={postId} initialComments={initialComments} />
      </DialogContent>
    </Dialog>
  )
} 