'use client'

import { useState } from "react"
import PromptInput from "@/components/PromptInput"

export default function ImageGenerationSection() {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateImage = async () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setPrompt("")
        }, 2000)
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