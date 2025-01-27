'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import PromptInput from "@/components/PromptInput"
import { toast } from "sonner"

export default function ImageGenerationSection() {
    const router = useRouter()
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateImage = async () => {
        try {
            setIsLoading(true)
            // 실제 API 연동 시 사용할 코드
            // const response = await fetch('/api/generate-image', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ prompt })
            // })
            // const data = await response.json()
            // if (data.success) {
            //     router.push(`/generate/${data.imageId}`)
            // }

            // 임시 구현
            await new Promise(resolve => setTimeout(resolve, 2000))
            toast.success("이미지가 생성되었습니다!")
            setPrompt("")
            // router.push('/generate/temp-id')
        } catch (error) {
            console.error('이미지 생성 실패:', error)
            toast.error("이미지 생성에 실패했습니다. 다시 시도해 주세요.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">
                AI로 당신만의 이미지를 만들어보세요
            </h1>
            
            <PromptInput
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleGenerateImage}
                isLoading={isLoading}
            />
        </div>
    )
} 