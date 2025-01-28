import { Button } from '@/components/ui/button'
import { Download, Share2, Save } from 'lucide-react'
import Image from 'next/image'
import { IGenerateImagePreviewProps } from '@/types'

export function GeneratedImagePreview({ imageUrl, onShare }: IGenerateImagePreviewProps): JSX.Element {
    const handleDownload = async () => {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'generated-image.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const handleSaveToGallery = () => {
        alert('갤러리에 저장되었습니다.')
    }

    return (
        <div className="space-y-4">
            <div className="relative aspect-square w-full max-w-2xl mx-auto overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    alt="Generated image"
                    fill
                    className="object-cover"
                />
            </div>
            
            <div className="flex justify-center gap-4">
                <Button onClick={handleSaveToGallery} variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    갤러리에 저장
                </Button>
                <Button onClick={onShare} variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    커뮤니티 공유
                </Button>
                <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                </Button>
            </div>
        </div>
    )
} 