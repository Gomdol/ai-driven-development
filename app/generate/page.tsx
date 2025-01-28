'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { GeneratedImagePreview } from "@/components/GeneratedImagePreview"
import ShareModal from './ShareModal'
import { IStyleOptions } from '@/types'
import { toast } from 'sonner'
import { MOCK_IMAGES } from '@/utils/mocks/images'

export default function GeneratePage() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState('')
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>({
    artStyle: 'Realistic',
    colorTone: 'Natural'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // URL에서 프롬프트 파라미터 가져오기
  useEffect(() => {
    const urlPrompt = searchParams.get('prompt')
    if (urlPrompt) {
      setPrompt(decodeURIComponent(urlPrompt))
    }
  }, [searchParams])

  // 이미지 생성 함수
  const handleGenerate = async () => {
    try {
      if (prompt.length < 3) {
        toast.error('프롬프트를 3자 이상 입력해주세요')
        return
      }

      setIsLoading(true)
      const loadingToast = toast.loading('AI가 이미지를 생성하고 있습니다...')
      
      // 선택된 스타일에 따른 이미지 배열 선택
      const styleImages = MOCK_IMAGES[styleOptions.artStyle as keyof typeof MOCK_IMAGES] || MOCK_IMAGES.default
      
      // 생성 과정 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 랜덤 이미지 선택
      const randomImage = styleImages[Math.floor(Math.random() * styleImages.length)]
      setGeneratedImage(randomImage)
      
      toast.dismiss(loadingToast)
      toast.success('이미지가 생성되었습니다!', {
        description: `${styleOptions.artStyle} 스타일로 생성됨`
      })

    } catch (error) {
      console.error('이미지 생성 오류:', error)
      toast.error('이미지 생성에 실패했습니다', {
        description: '다시 시도해 주세요'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Enter 키 입력 시 이미지 생성
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && prompt.length >= 3) {
        handleGenerate()
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        AI 이미지 생성
      </h1>
      <div className="space-y-6">
        {/* 프롬프트 입력 섹션 */}
        <div className="space-y-4">
          <Textarea 
            placeholder="이미지를 생성할 프롬프트를 입력하세요 (3자 이상)"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[100px]"
          />
          
          {/* 스타일 옵션 섹션 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">예술 스타일</label>
              <Select 
                value={styleOptions.artStyle}
                onValueChange={(value: string) => setStyleOptions({...styleOptions, artStyle: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Realistic', 'Anime', 'Oil Painting', 'Watercolor', 'Digital Art', 'Sketch', 'Pop Art'].map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">색조</label>
              <Select
                value={styleOptions.colorTone}
                onValueChange={(value: string) => setStyleOptions({...styleOptions, colorTone: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Natural', 'Vibrant', 'Muted', 'Monochrome', 'Warm', 'Cool', 'Vintage'].map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 이미지 생성 버튼 */}
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerate}
            disabled={prompt.length < 3 || isLoading}
            className="w-40"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                생성 중...
              </>
            ) : '이미지 생성'}
          </Button>
        </div>

        {/* 이미지 프리뷰 및 관리 섹션 */}
        {generatedImage && (
          <GeneratedImagePreview
            imageUrl={generatedImage}
            onShare={() => setIsShareModalOpen(true)}
          />
        )}
      </div>

      {/* 공유 모달 */}
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        imageUrl={generatedImage}
        prompt={prompt}
        styleOptions={styleOptions}
      />
    </div>
  )
} 