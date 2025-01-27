"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IPromptInput } from "@/types"
import { ChangeEvent, useState } from "react"
import { toast } from "sonner"

export default function PromptInput({ value, onChange, onSubmit, isLoading }: IPromptInput) {
    const [error, setError] = useState<string>("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        onChange(e.target.value)
    }

    const handleSubmit = () => {
        if (!value.trim()) {
            setError("프롬프트를 입력해 주세요")
            toast.error("프롬프트를 입력해 주세요")
            return
        }
        onSubmit()
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
            <div className="space-y-2">
                <Input
                    placeholder="이미지를 생성하기 위한 프롬프트를 입력하세요..."
                    value={value}
                    onChange={handleChange}
                    className={`w-full ${error ? 'border-red-500' : ''}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? "prompt-error" : undefined}
                />
                {error && (
                    <p id="prompt-error" className="text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>
            <Button 
                onClick={handleSubmit}
                disabled={!value.trim() || isLoading}
                className="w-full"
            >
                {isLoading ? "이미지 생성 중..." : "이미지 생성하기"}
            </Button>
        </div>
    )
} 