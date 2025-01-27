import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

interface IShareModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string | null
  prompt: string
  styleOptions: object
}

export default function ShareModal({ isOpen, onClose, imageUrl, prompt, styleOptions }: IShareModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [visibility, setVisibility] = useState('public')

  const handleShare = () => {
    if (!title) {
      alert('제목을 입력해주세요')
      return
    }

    // 목업: 공유 성공 메시지
    alert('커뮤니티에 공유되었습니다.')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>커뮤니티 공유</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">제목</label>
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="게시물 제목을 입력하세요"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">설명 (선택사항)</label>
            <Textarea
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="게시물 설명을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">태그 (선택사항)</label>
            <Input
              value={tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
              placeholder="쉼표로 구분하여 입력 (예: 풍경,자연,디지털아트)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">공개 범위</label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">전체 공개</SelectItem>
                <SelectItem value="friends">친구 공개</SelectItem>
                <SelectItem value="private">비공개</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleShare}>공유하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 