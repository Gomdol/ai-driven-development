import { Button } from '@/components/ui/button'

interface BatchActionBarProps {
  selectedCount: number
  onDelete: () => void
  onVisibilityChange: () => void
  onTagsChange: () => void
}

export function BatchActionBar({
  selectedCount,
  onDelete,
  onVisibilityChange,
  onTagsChange
}: BatchActionBarProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-4">
      <span className="text-sm text-gray-600">
        {selectedCount}개 선택됨
      </span>
      <Button variant="destructive" onClick={onDelete}>
        삭제
      </Button>
      <Button variant="outline" onClick={onVisibilityChange}>
        공개 상태 변경
      </Button>
      <Button variant="outline" onClick={onTagsChange}>
        태그 관리
      </Button>
    </div>
  )
} 