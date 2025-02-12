// ... imports ...

// 목업 데이터
const MOCK_COMMENTS: IComment[] = [
  {
    id: '1',
    content: '멋진 이미지네요!',
    userName: '사용자1',
    userProfile: '/default-avatar.png',
    createdAt: new Date().toISOString(),
  },
  // ... 더 많은 목업 댓글 데이터
]

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  return (
    // ... 다른 컴포넌트들 ...
    <CommentSection 
      postId={params.postId} 
      initialComments={MOCK_COMMENTS}
    />
  )
} 