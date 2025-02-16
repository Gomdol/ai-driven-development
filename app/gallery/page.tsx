'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageCard } from '@/components/gallery/ImageCard'
import { ImageDetailModal } from '@/components/gallery/ImageDetailModal'
import { BatchActionBar } from '@/components/gallery/BatchActionBar'
import { mockGalleryImages } from '@/utils/mocks/gallery'
import { toast } from "sonner"
import { CalendarIcon } from "lucide-react"

export default function GalleryPage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  
  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const handleImageClick = (imageId: string) => {
    setSelectedPostId(imageId)
    setShowDetailModal(true)
  }

  const handleBatchDelete = () => {
    // 실제 구현 시 API 호출
    toast("이미지 삭제 완료", {
      description: `${selectedImages.length}개의 이미지가 삭제되었습니다.`
    })
    setSelectedImages([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 필터 및 정렬 섹션 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button variant="outline" className="w-[240px] justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>날짜 선택</span>
        </Button>
        <Select defaultValue="latest" onValueChange={() => {}}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
            <SelectItem value="likes">좋아요순</SelectItem>
            <SelectItem value="views">조회수순</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all" onValueChange={() => {}}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="공개 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="public">공개</SelectItem>
            <SelectItem value="private">비공개</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 일괄 작업 도구바 */}
      {selectedImages.length > 0 && (
        <BatchActionBar
          selectedCount={selectedImages.length}
          onDelete={handleBatchDelete}
          onVisibilityChange={() => {}}
          onTagsChange={() => {}}
        />
      )}

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockGalleryImages.map(image => (
          <ImageCard
            key={image.id}
            image={image}
            selected={selectedImages.includes(image.id)}
            onSelect={() => handleImageSelect(image.id)}
            onClick={() => handleImageClick(image.id)}
          />
        ))}
      </div>

      {/* 이미지 상세 모달 */}
      {showDetailModal && selectedPostId && (
        <ImageDetailModal
          postId={selectedPostId}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  )
} 