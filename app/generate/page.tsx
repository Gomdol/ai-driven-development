'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Loader2 } from 'lucide-react'
import GenerateImagePreview from '@/components/GenerateImagePreview'
import ShareModal from '@/components/ShareModal'

interface IStyleOptions {
  colorScheme: string
  textureStrength: number
  mood: string
  preset: string
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>({
    colorScheme: 'Vibrant',
    textureStrength: 50,
    mood: 'Dreamy',
    preset: 'Digital Art'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // 목업 이미지 생성 함수
  const handleGenerate = async () => {
    if (prompt.length < 10) {
      alert('프롬프트를 10자 이상 입력해주세요')
      return
    }

    setIsLoading(true)
    
    // 목업 데이터: 3초 후 이미지 생성
    setTimeout(() => {
      setGeneratedImage('https://picsum.photos/800/800')
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* 프롬프트 입력 섹션 */}
        <div className="space-y-4">
          <Textarea 
            placeholder="이미지를 생성할 프롬프트를 입력하세요 (10자 이상)"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          
          {/* 스타일 옵션 섹션 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">색감</label>
              <Select 
                value={styleOptions.colorScheme}
                onValueChange={(value: string) => setStyleOptions({...styleOptions, colorScheme: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Vibrant', 'Muted', 'Monochrome', 'Warm', 'Cool'].map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">분위기</label>
              <Select
                value={styleOptions.mood}
                onValueChange={(value: string) => setStyleOptions({...styleOptions, mood: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Dreamy', 'Realistic', 'Abstract', 'Artistic'].map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">스타일 프리셋</label>
              <Select
                value={styleOptions.preset}
                onValueChange={(value: string) => setStyleOptions({...styleOptions, preset: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Anime', 'Oil Painting', 'Watercolor', 'Digital Art'].map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">텍스처 강도: {styleOptions.textureStrength}</label>
              <Slider
                value={[styleOptions.textureStrength]}
                onValueChange={([value]: number[]) => setStyleOptions({...styleOptions, textureStrength: value})}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>

        {/* 이미지 생성 버튼 */}
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerate}
            disabled={prompt.length < 10 || isLoading}
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
          <GenerateImagePreview
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