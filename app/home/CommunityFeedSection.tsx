'use client'

import { useState } from 'react'
import { IPost } from '@/types'
import { MOCK_POSTS } from '@/utils/mocks/posts'
import { CommunityFeedCard } from '@/components/CommunityFeedCard'

export default function CommunityFeedSection() {
    const [posts, setPosts] = useState<IPost[]>(MOCK_POSTS)

    const handlePostUpdate = (postId: string, updates: Partial<IPost>) => {
        setPosts(prev => prev.map(post => 
            post.postId === postId ? { ...post, ...updates } : post
        ))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <CommunityFeedCard 
                    key={post.postId} 
                    post={post}
                    onUpdate={(updates) => handlePostUpdate(post.postId, updates)}
                />
            ))}
        </div>
    )
} 