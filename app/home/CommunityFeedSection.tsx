'use client'

import { useState } from 'react'
import { IPost } from '@/types'
import { MOCK_POSTS } from '@/utils/mocks/posts'
import { CommunityFeedCard } from '@/components/CommunityFeedCard'

export default function CommunityFeedSection() {
    const [posts] = useState<IPost[]>(MOCK_POSTS)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <CommunityFeedCard key={post.postId} post={post} />
            ))}
        </div>
    )
} 