'use client'

import { useState } from "react"
import PromptInput from "@/components/PromptInput"
import CommunityFeedCard from "@/components/CommunityFeedCard"
import { IPost } from "@/types"

// 목업 데이터
const MOCK_POSTS: IPost[] = [
    {
        postId: "1",
        imageURL: "https://picsum.photos/400/400",
        userName: "창작자1",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        createdAt: "2024-03-20",
        likes: 120,
        comments: 15,
        scraps: 30
    },
    {
        postId: "2",
        imageURL: "https://picsum.photos/401/400",
        userName: "창작자2",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        createdAt: "2024-03-20",
        likes: 85,
        comments: 8,
        scraps: 20
    },
    {
        postId: "3",
        imageURL: "https://picsum.photos/402/400",
        userName: "창작자3",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        createdAt: "2024-03-20",
        likes: 200,
        comments: 25,
        scraps: 45
    },
    {
        postId: "4",
        imageURL: "https://picsum.photos/403/400",
        userName: "창작자4",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
        createdAt: "2024-03-20",
        likes: 150,
        comments: 18,
        scraps: 35
    },
    {
        postId: "5",
        imageURL: "https://picsum.photos/404/400",
        userName: "창작자5",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
        createdAt: "2024-03-20",
        likes: 95,
        comments: 12,
        scraps: 25
    },
    {
        postId: "6",
        imageURL: "https://picsum.photos/405/400",
        userName: "창작자6",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
        createdAt: "2024-03-20",
        likes: 180,
        comments: 22,
        scraps: 40
    },
    {
        postId: "7",
        imageURL: "https://picsum.photos/406/400",
        userName: "창작자7",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
        createdAt: "2024-03-20",
        likes: 250,
        comments: 30,
        scraps: 55
    },
    {
        postId: "8",
        imageURL: "https://picsum.photos/407/400",
        userName: "창작자8",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
        createdAt: "2024-03-20",
        likes: 165,
        comments: 20,
        scraps: 38
    },
    {
        postId: "9",
        imageURL: "https://picsum.photos/408/400",
        userName: "창작자9",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=9",
        createdAt: "2024-03-20",
        likes: 135,
        comments: 16,
        scraps: 32
    },
    {
        postId: "10",
        imageURL: "https://picsum.photos/409/400",
        userName: "창작자10",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=10",
        createdAt: "2024-03-20",
        likes: 220,
        comments: 28,
        scraps: 48
    }
]

export default function Home() {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateImage = async () => {
        setIsLoading(true)
        // 실제 API 연동 대신 타이머로 로딩 시뮬레이션
        setTimeout(() => {
            setIsLoading(false)
            setPrompt("")
            // 실제로는 여기서 이미지 생성 페이지로 이동
        }, 2000)
    }

    return (
        <main className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    AI로 당신만의 이미지를 만들어보세요
                </h1>
                
                <PromptInput
                    value={prompt}
                    onChange={setPrompt}
                    onSubmit={handleGenerateImage}
                    isLoading={isLoading}
                />

                <div className="mt-16">
                    <h2 className="text-2xl font-semibold mb-8">커뮤니티 피드</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_POSTS.map((post) => (
                            <CommunityFeedCard key={post.postId} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
