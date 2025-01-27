import { IPost, IComment } from "@/types"

export const MOCK_POSTS: IPost[] = [
    {
        postId: "1",
        imageURL: "https://picsum.photos/400/400",
        userName: "창작자1",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        createdAt: "2024-03-20",
        likes: 120,
        comments: 15,
        scraps: 30,
        isLiked: false
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

export const MOCK_COMMENTS: IComment[] = [
    {
        id: "1",
        postId: "1",
        content: "정말 멋진 작품이네요!",
        userName: "댓글러1",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment1",
        createdAt: "2024-03-20T10:00:00Z"
    },
    {
        id: "2",
        postId: "1",
        content: "어떤 프롬프트를 사용하셨나요?",
        userName: "댓글러2",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment2",
        createdAt: "2024-03-20T11:30:00Z"
    },
    {
        id: "3",
        postId: "1",
        content: "색감이 너무 예쁘네요 👍",
        userName: "댓글러3",
        userProfile: "https://api.dicebear.com/7.x/avataaars/svg?seed=comment3",
        createdAt: "2024-03-20T12:15:00Z"
    }
] 