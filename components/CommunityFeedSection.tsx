'use client'

import { useState, useEffect } from "react"
import CommunityFeedCard from "@/components/CommunityFeedCard"
import { MOCK_POSTS } from "@/utils/mockData"
import { IPost } from "@/types"

export default function CommunityFeedSection() {
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        setPosts(MOCK_POSTS)
    }, [])

    if (posts.length === 0) {
        return (
            <div className="text-center text-muted-foreground">
                데이터를 불러오는 중...
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <CommunityFeedCard key={post.postId} post={post} />
            ))}
        </div>
    )
} 