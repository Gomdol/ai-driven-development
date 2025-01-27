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

export interface ICommentSectionProps {
    postId: string;
    comments: IComment[];
    onAddComment: (content: string) => void;
}

export interface IGenerateImagePreviewProps {
    imageUrl: string;
    onShare: () => void;
}

export interface IShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string | null;
    prompt: string;
    styleOptions: object;
}

export interface IStyleOptions {
    colorScheme: string;
    textureStrength: number;
    mood: string;
    preset: string;
}

export interface ICommunityFeedCardProps {
    post: IPost;
}

export interface IImageGenerationSectionProps {
    onImageGenerated?: (imageUrl: string) => void;
} 