import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { MoreVertical } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { IImageCardProps } from '@/types'

export function ImageCard({ image, selected, onSelect, onClick }: IImageCardProps) {
  return (
    <Card className="relative group">
      {/* 체크박스 */}
      <div className="absolute top-2 left-2 z-10">
        <Checkbox
          checked={selected}
          onCheckedChange={onSelect}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
        />
      </div>

      {/* 더보기 메뉴 */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>수정</DropdownMenuItem>
            <DropdownMenuItem>삭제</DropdownMenuItem>
            <DropdownMenuItem>공유</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 이미지 */}
      <div 
        className="aspect-square cursor-pointer"
        onClick={onClick}
      >
        <img
          src={image.thumbnail}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* 메타 정보 */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
          <span className="text-sm">
            {image.visibility === 'public' ? '공개' : '비공개'}
          </span>
        </div>
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
          <span>좋아요 {image.stats.likes}</span>
          <span>조회 {image.stats.views}</span>
        </div>
      </div>
    </Card>
  )
} 