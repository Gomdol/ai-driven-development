import { IPost } from '@/types'

export const MOCK_POSTS: IPost[] = [
  {
    postId: '1',
    imageURL: 'https://picsum.photos/seed/post1/400/400',
    userName: '창작자1',
    userProfile: 'https://picsum.photos/seed/user1/40/40',
    createdAt: '2024-03-20',
    likes: 156,
    comments: 23,
    scraps: 45,
    commentList: [
      {
        id: '1',
        content: '멋진 이미지네요!',
        userName: '댓글작성자1',
        userProfile: '/avatars/commenter1.jpg',
        createdAt: new Date().toISOString()
      },
      // ... 더 많은 댓글
    ]
  },
  {
    postId: '2',
    imageURL: 'https://picsum.photos/seed/post2/400/400',
    userName: '아티스트2',
    userProfile: 'https://picsum.photos/seed/user2/40/40',
    createdAt: '2024-03-19',
    likes: 89,
    comments: 12,
    scraps: 34
  },
  {
    postId: '3',
    imageURL: 'https://picsum.photos/seed/post3/400/400',
    userName: '디자이너3',
    userProfile: 'https://picsum.photos/seed/user3/40/40',
    createdAt: '2024-03-18',
    likes: 234,
    comments: 45,
    scraps: 67
  },
  {
    postId: '4',
    imageURL: 'https://picsum.photos/seed/post4/400/400',
    userName: '크리에이터4',
    userProfile: 'https://picsum.photos/seed/user4/40/40',
    createdAt: '2024-03-17',
    likes: 78,
    comments: 15,
    scraps: 23
  },
  {
    postId: '5',
    imageURL: 'https://picsum.photos/seed/post5/400/400',
    userName: '작가5',
    userProfile: 'https://picsum.photos/seed/user5/40/40',
    createdAt: '2024-03-16',
    likes: 345,
    comments: 56,
    scraps: 89
  },
  {
    postId: '6',
    imageURL: 'https://picsum.photos/seed/post6/400/400',
    userName: '일러스트레이터6',
    userProfile: 'https://picsum.photos/seed/user6/40/40',
    createdAt: '2024-03-15',
    likes: 167,
    comments: 34,
    scraps: 56
  },
  {
    postId: '7',
    imageURL: 'https://picsum.photos/seed/post7/400/400',
    userName: '포토그래퍼7',
    userProfile: 'https://picsum.photos/seed/user7/40/40',
    createdAt: '2024-03-14',
    likes: 289,
    comments: 67,
    scraps: 78
  },
  {
    postId: '8',
    imageURL: 'https://picsum.photos/seed/post8/400/400',
    userName: '예술가8',
    userProfile: 'https://picsum.photos/seed/user8/40/40',
    createdAt: '2024-03-13',
    likes: 198,
    comments: 45,
    scraps: 34
  },
  {
    postId: '9',
    imageURL: 'https://picsum.photos/seed/post9/400/400',
    userName: '화가9',
    userProfile: 'https://picsum.photos/seed/user9/40/40',
    createdAt: '2024-03-12',
    likes: 267,
    comments: 89,
    scraps: 45
  },
  {
    postId: '10',
    imageURL: 'https://picsum.photos/seed/post10/400/400',
    userName: '디지털아티스트10',
    userProfile: 'https://picsum.photos/seed/user10/40/40',
    createdAt: '2024-03-11',
    likes: 456,
    comments: 78,
    scraps: 123
  }
] 