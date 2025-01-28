import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface IShareModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string | null
  prompt: string
  styleOptions: {
    artStyle: string
    colorTone: string
  }
}

export default function ShareModal({ isOpen, onClose, imageUrl, prompt, styleOptions }: IShareModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* 모달 내용 */}
      </DialogContent>
    </Dialog>
  )
} 