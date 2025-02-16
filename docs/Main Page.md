## 메인페이지 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

1. **이미지 생성 섹션** (구현 완료)
   - **파일 위치**: `app/home/ImageGenerationSection.tsx`
   - **UI 구성**: 
     - 중앙 정렬된 제목 "AI로 당신만의 이미지를 만들어보세요"
     - PromptInput 컴포넌트를 사용한 프롬프트 입력 필드
   - **상호작용**:
     - 프롬프트 입력 후 Enter 또는 버튼 클릭 시 `/generate` 페이지로 이동
     - 3자 미만 입력 시 Sonner 토스트로 에러 메시지 표시
     - 입력 중 로딩 상태 표시

2. **커뮤니티 피드 섹션** (구현 완료)
   - **파일 위치**: `app/home/CommunityFeedSection.tsx`
   - **UI 구성**:
     - 반응형 그리드 레이아웃 (1~4컬럼)
     - CommunityFeedCard 컴포넌트로 각 포스트 표시
   - **카드 기능**:
     - 이미지 클릭 시 `/post/[postId]` 페이지로 이동
     - 댓글 버튼 클릭 시 CommentModal 표시
     - 좋아요/스크랩 상태 로컬 관리

#### 2. 데이터 관리 (현재 목업 데이터 사용)

1. **포스트 데이터**
   - **파일 위치**: `utils/mocks/posts.ts`
   - **구조**:
     ```typescript
     interface IPost {
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
     ```

2. **상태 관리**
   - 좋아요/스크랩: useState로 로컬 상태 관리
   - 댓글: CommentModal 내부에서 로컬 상태로 관리
   - 향후 서버 상태 관리로 마이그레이션 예정

#### 3. 컴포넌트 구조

```
Home (page.tsx)
├── ImageGenerationSection
│   └── PromptInput (ShadCN Input + Button)
└── CommunityFeedSection
    ├── CommunityFeedCard
    └── CommentModal (ShadCN Dialog)
        └── CommentSection
```

### 백엔드 기능명세서 (구현 예정)

#### 1. API 엔드포인트

1. **피드 조회 API**
   - **경로**: `app/api/feed/route.ts`
   - **메서드**: GET
   - **응답 데이터**:
     ```typescript
     {
       posts: IPost[];
       nextCursor?: string;
       hasMore: boolean;
     }
     ```

2. **상호작용 API**
   - **경로**: `app/api/posts/[postId]/route.ts`
   - **메서드**: POST, PUT
   - **기능**:
     - 좋아요/스크랩 토글
     - 댓글 CRUD
     - 조회수 증가

#### 2. 데이터베이스 스키마 (Drizzle)

```typescript
// posts 테이블
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  likes: integer('likes').default(0),
  comments: integer('comments').default(0),
  scraps: integer('scraps').default(0),
});

// comments 테이블
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id),
  userId: integer('user_id').references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```
