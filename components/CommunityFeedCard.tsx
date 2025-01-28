import { IPost } from '@/types'

interface Props {
  post: IPost
}

export function CommunityFeedCard({ post }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <img
          src={post.imageURL}
          alt={`Post by ${post.userName}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.userProfile}
            alt={post.userName}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium">{post.userName}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>좋아요 {post.likes}</span>
          <span>댓글 {post.comments}</span>
          <span>스크랩 {post.scraps}</span>
        </div>
      </div>
    </div>
  )
} 