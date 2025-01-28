'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { IPromptInput } from "@/types"

export function PromptInput({ value, onChange, onSubmit, isLoading }: IPromptInput) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!isLoading && value.length >= 3) {
                onSubmit()
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <Textarea
                placeholder="이미지를 생성할 프롬프트를 입력하세요 (3자 이상)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[100px]"
            />
            
            <div className="flex justify-center">
                <Button
                    onClick={onSubmit}
                    disabled={value.length < 3 || isLoading}
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
        </div>
    )
} 