import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IPromptInput } from "@/types"
import { ChangeEvent } from "react"

export default function PromptInput({ value, onChange, onSubmit, isLoading }: IPromptInput) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
            <Input
                placeholder="이미지를 생성하기 위한 프롬프트를 입력하세요..."
                value={value}
                onChange={handleChange}
                className="w-full"
            />
            <Button 
                onClick={onSubmit}
                disabled={!value.trim() || isLoading}
                className="w-full"
            >
                {isLoading ? "이미지 생성 중..." : "이미지 생성하기"}
            </Button>
        </div>
    )
} 