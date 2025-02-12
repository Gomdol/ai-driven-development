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
    commentList?: IComment[];
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
    artStyle: string;    // 예술 스타일
    colorTone: string;   // 색조
}

export interface ICommunityFeedCardProps {
    post: IPost;
}

export interface IImageGenerationSectionProps {
    onImageGenerated?: (imageUrl: string) => void;
}

export interface ICommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string;
    initialComments: IComment[];
}

export interface IBatchActionBarProps {
    selectedCount: number;
    onDelete: () => void;
    onVisibilityChange: () => void;
    onTagsChange: () => void;
}

export interface IImageCardProps {
    image: {
        id: string;
        url: string;
        thumbnail: string;
        createdAt: string;
        visibility: 'public' | 'private';
        stats: {
            likes: number;
            views: number;
        };
    };
    selected: boolean;
    onSelect: () => void;
    onClick: () => void;
}

export interface IImageDetailModalProps {
    imageId: string;
    onClose: () => void;
} 