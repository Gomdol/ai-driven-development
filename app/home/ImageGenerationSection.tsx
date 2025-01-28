'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PromptInput } from "@/components/PromptInput"
import { toast } from "sonner"

export default function ImageGenerationSection() {
    const router = useRouter()
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateImage = async () => {
        try {
            if (prompt.length < 3) {
                toast.error("프롬프트를 3자 이상 입력해주세요")
                return
            }

            setIsLoading(true)
            router.push(`/generate?prompt=${encodeURIComponent(prompt)}`)
            
        } catch (error) {
            console.error('이동 실패:', error)
            toast.error("페이지 이동에 실패했습니다. 다시 시도해 주세요.")
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