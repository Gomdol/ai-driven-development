export interface IPost {
    postId: string;
    imageURL: string;
    userName: string;
    userProfile: string;
    createdAt: string;
    likes: number;
    comments: number;
    scraps: number;
    isLiked?: boolean;
}

export interface IComment {
    id: string;
    postId: string;
    content: string;
    userName: string;
    userProfile: string;
    createdAt: string;
}

export interface IPromptInput {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
} 