## 갤러리 관리 및 커뮤니티 공유 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세 (구현 완료)

- **파일 위치**: `app/gallery/page.tsx`

1. **갤러리 관리 섹션**
   - **파일 위치**: `app/gallery/page.tsx`
   - **UI 구성**: 
     - 상단 필터/정렬 옵션 (ShadCN Select)
       - 날짜 선택 버튼
       - 정렬 기준 (최신순/오래된순/좋아요순/조회수순)
       - 공개 상태 필터 (전체/공개/비공개)
     - 반응형 그리드 레이아웃 (1~4컬럼)
     - 일괄 작업 도구바 (선택 시 표시)

2. **이미지 카드 컴포넌트**
   - **파일 위치**: `components/gallery/ImageCard.tsx`
   - **UI 구성**:
     - 체크박스 (다중 선택용)
     - 더보기 메뉴 (수정/삭제/공유)
     - 이미지 썸네일
     - 메타 정보 (날짜, 공개상태, 좋아요/조회수)
   - **상호작용**:
     - 클릭 시 상세 모달 표시
     - 체크박스로 선택 상태 토글
     - 더보기 메뉴로 빠른 작업

3. **이미지 상세 모달**
   - **파일 위치**: `components/gallery/ImageDetailModal.tsx`
   - **UI 구성**:
     - 원본 이미지 표시
     - 프롬프트 정보
     - 스타일 옵션 정보
     - 태그 관리 입력 필드

4. **일괄 작업 도구바**
   - **파일 위치**: `components/gallery/BatchActionBar.tsx`
   - **UI 구성**:
     - 선택된 이미지 수 표시
     - 일괄 삭제/공개 상태 변경/태그 관리 버튼
   - **상호작용**:
     - 작업 완료 시 Sonner 토스트로 알림

#### 2. 데이터 관리 (현재 목업 데이터 사용)

1. **갤러리 데이터**
   - **파일 위치**: `utils/mocks/gallery.ts`
   - **구조**:
     ```typescript
     interface IGalleryImage {
       id: string;
       url: string;
       thumbnail: string;
       createdAt: string;
       visibility: 'public' | 'private';
       stats: {
         likes: number;
         views: number;
       };
     }
     ```

2. **상태 관리**
   - 선택된 이미지: useState로 관리
   - 필터/정렬 옵션: useState로 관리
   - 모달 상태: useState로 관리

#### 3. 컴포넌트 구조

```
GalleryPage (page.tsx)
├── FilterSection
│   ├── DatePicker (Button)
│   ├── SortSelect (Select)
│   └── VisibilitySelect (Select)
├── BatchActionBar
├── ImageGrid
│   └── ImageCard
└── ImageDetailModal
```

#### 3. 사용자 흐름 및 상호작용

1. **갤러리 탐색 프로세스**
   ```
   필터/정렬 옵션 설정 → 이미지 목록 표시 → 
   이미지 선택 (단일/다중) → 작업 수행 (상세보기/수정/삭제/공유) →
   작업 완료 알림
   ```

2. **이미지 관리 프로세스**
   ```
   이미지 선택 → 상세 모달 열기 → 
   정보 수정 (공개 상태/태그) → 저장 →
   변경 사항 반영 및 알림
   ```

3. **커뮤니티 공유 프로세스**
   ```
   이미지 선택 → 공유 버튼 클릭 → 
   공유 설정 모달 (제목/설명/태그/공개범위) →
   공유 완료 및 커뮤니티 피드 반영
   ```

#### 4. API 연동

1. **갤러리 조회 API**
   - **경로**: `app/api/gallery/route.ts`
   - **메서드**: `GET`
   - **요청 데이터**: 
     ```typescript
     {
       page: number;
       limit: number;
       sortBy: 'latest' | 'oldest' | 'likes' | 'views';
       filters: {
         dateRange?: { start: string; end: string };
         style?: string[];
         visibility?: 'all' | 'public' | 'private';
       }
     }
     ```
   - **응답 데이터**:
     ```typescript
     {
       images: {
         id: string;
         url: string;
         thumbnail: string;
         prompt: string;
         styleOptions: object;
         createdAt: string;
         visibility: 'public' | 'private';
         stats: {
           likes: number;
           views: number;
         };
         tags: string[];
       }[];
       totalCount: number;
       currentPage: number;
     }
     ```

2. **이미지 관리 API**
   - **경로**: `app/api/gallery/[imageId]/route.ts`
   - **메서드**: `PUT`, `DELETE`
   - **요청 데이터** (PUT):
     ```typescript
     {
       visibility?: 'public' | 'private';
       tags?: string[];
     }
     ```

3. **일괄 작업 API**
   - **경로**: `app/api/gallery/batch/route.ts`
   - **메서드**: `POST`
   - **요청 데이터**:
     ```typescript
     {
       imageIds: string[];
       action: 'delete' | 'updateVisibility' | 'updateTags';
       payload?: {
         visibility?: 'public' | 'private';
         tags?: string[];
       }
     }
     ```

#### 5. 테스트 항목

1. **갤러리 표시 및 필터링**
   - 필터 및 정렬 옵션 적용 결과 확인
   - 페이지네이션 동작 확인
   - 이미지 그리드 레이아웃 반응형 동작 확인

2. **이미지 관리 기능**
   - 단일/다중 선택 기능 확인
   - 상세 모달 표시 및 정보 수정 확인
   - 일괄 작업 기능 동작 확인

3. **커뮤니티 공유 기능**
   - 공유 설정 모달 동작 확인
   - 공개 범위 설정 적용 확인
   - 커뮤니티 피드 반영 확인

4. **성능 및 사용성**
   - 이미지 로딩 최적화 확인
   - 드래그 앤 드롭 동작 확인
   - 토스트 메시지 표시 확인

---

### 백엔드 기능명세서

#### 1. 갤러리 관리 API 구현

- **파일 위치**: `app/api/gallery/route.ts`
- **기능**:
  - 사용자별 갤러리 이미지 조회
  - 필터링 및 정렬 로직 처리
  - 페이지네이션 처리
  - 이미지 메타데이터 관리

#### 2. 이미지 관리 API 구현

- **파일 위치**: `app/api/gallery/[imageId]/route.ts`
- **메서드**: `PUT`, `DELETE`
- **기능**:
  - 메타데이터 수정
  - 공개 상태 관리
  - 태그 관리
  - 이미지 삭제

#### 3. 일괄 작업 API 구현

- **파일 위치**: `app/api/gallery/batch/route.ts`
- **메서드**: `POST`
- **기능**:
  - 다중 이미지 처리
  - 트랜잭션 관리
  - 작업 결과 로깅

#### 4. 테스트 항목

1. **갤러리 API**
   - 필터링 및 정렬 로직 검증
   - 페이지네이션 정확성 검증
   - 권한 체크 검증

2. **이미지 관리 API**
   - CRUD 작업 정확성 검증
   - 메타데이터 업데이트 검증
   - 권한 관리 검증

3. **일괄 작업 API**
   - 트랜잭션 처리 검증
   - 롤백 동작 검증
   - 대량 작업 성능 검증

4. **보안 및 권한**
   - 사용자 인증 검증
   - 리소스 접근 권한 검증
   - API 요청 제한 검증 