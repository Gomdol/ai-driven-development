## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/generate/page.tsx`

1. **프롬프트 입력 및 스타일 옵션 섹션**
   - **UI 구성**: 
     - 화면 상단에 프롬프트 입력 필드 배치 (ShadCN의 `Textarea` 컴포넌트 사용)
     - 입력 필드 하단에 스타일 옵션 선택을 위한 드롭다운과 슬라이더 배치
   - **스타일 옵션**:
     - 색감 선택 (드롭다운): Vibrant, Muted, Monochrome, Warm, Cool
     - 텍스처 강도 (슬라이더): 0-100
     - 분위기 선택 (드롭다운): Dreamy, Realistic, Abstract, Artistic
     - 스타일 프리셋 (드롭다운): Anime, Oil Painting, Watercolor, Digital Art
   - **오류 처리**: 
     - 프롬프트 미입력 시 "프롬프트를 입력해 주세요" 메시지 표시
     - 최소 10자 이상 입력 필요

2. **이미지 생성 섹션**
   - **UI 구성**:
     - 중앙에 이미지 프리뷰 영역 배치
     - 하단에 '생성하기' 버튼 (ShadCN의 `Button` 컴포넌트)
     - 로딩 중 상태를 표시할 스피너 애니메이션
   - **상호작용**:
     - 생성 버튼 클릭 시 API 요청 및 로딩 상태 표시
     - 이미지 생성 완료 시 프리뷰 영역에 결과물 표시
   - **오류 처리**:
     - API 오류 발생 시 재시도 버튼과 함께 오류 메시지 표시

3. **생성된 이미지 관리 섹션**
   - **UI 구성**:
     - 이미지 프리뷰 하단에 '갤러리에 저장' 및 '커뮤니티 공유' 버튼
     - 이미지 다운로드 버튼
   - **상호작용**:
     - 갤러리 저장 시 성공/실패 알림 표시
     - 커뮤니티 공유 선택 시 공유 설정 모달 표시
     - 다운로드 버튼 클릭 시 이미지 파일 저장

4. **공유 설정 모달**
   - **UI 구성**:
     - 제목 입력 필드
     - 설명 입력 필드 (선택사항)
     - 태그 입력 필드 (선택사항)
     - 공개 범위 설정 (전체 공개/친구 공개/비공개)
   - **상호작용**:
     - 입력 완료 후 '공유하기' 버튼 클릭 시 커뮤니티에 게시
     - 취소 버튼으로 모달 닫기

#### 2. 사용자 흐름 및 상호작용

1. **이미지 생성 프로세스**
   ```
   프롬프트 입력 → 스타일 옵션 설정 → 생성 버튼 클릭 → 
   로딩 상태 표시 → 이미지 생성 완료 → 결과물 표시
   ```

2. **이미지 저장 및 공유 프로세스**
   ```
   이미지 생성 완료 → 
   갤러리 저장 또는 커뮤니티 공유 선택 → 
   공유 시 모달에서 설정 입력 → 
   게시 완료 및 피드백 제공
   ```

#### 3. API 연동

1. **이미지 생성 API**
   - **경로**: `app/api/generate/route.ts`
   - **메서드**: `POST`
   - **요청 데이터**:
     ```typescript
     interface IGenerateRequest {
       prompt: string;
       styleOptions: {
         colorScheme?: string;
         textureStrength?: number;
         mood?: string;
         preset?: string;
       }
     }
     ```
   - **응답 데이터**:
     ```typescript
     interface IGenerateResponse {
       success: boolean;
       imageUrl?: string;
       error?: string;
     }
     ```

2. **갤러리 저장 API**
   - **경로**: `app/api/gallery/route.ts`
   - **메서드**: `POST`
   - **요청 데이터**:
     ```typescript
     interface ISaveToGalleryRequest {
       imageUrl: string;
       prompt: string;
       styleOptions: object;
     }
     ```

3. **커뮤니티 공유 API**
   - **경로**: `app/api/community/post/route.ts`
   - **메서드**: `POST`
   - **요청 데이터**:
     ```typescript
     interface IShareToCommunityRequest {
       imageUrl: string;
       prompt: string;
       styleOptions: object;
       title: string;
       description?: string;
       tags?: string[];
       visibility: 'public' | 'friends' | 'private';
     }
     ```

#### 4. 테스트 항목

1. **프롬프트 입력 및 스타일 옵션**
   - 프롬프트 입력 필드 유효성 검사
   - 스타일 옵션 선택/변경 정상 작동
   - 필수 입력값 누락 시 오류 메시지 표시

2. **이미지 생성 프로세스**
   - 생성 버튼 클릭 시 API 호출 정상 작동
   - 로딩 상태 표시 및 애니메이션
   - 이미지 생성 결과 표시 확인
   - 오류 발생 시 적절한 피드백 제공

3. **이미지 관리 기능**
   - 갤러리 저장 기능 정상 작동
   - 커뮤니티 공유 모달 표시 및 입력
   - 이미지 다운로드 기능 정상 작동

4. **반응형 디자인**
   - 다양한 화면 크기에서 레이아웃 정상 표시
   - 모바일 환경에서 터치 인터랙션 정상 작동

---

### 백엔드 기능명세서

#### 1. 이미지 생성 API 구현

- **파일 위치**: `app/api/generate/route.ts`
- **기능**:
  - 프롬프트 및 스타일 옵션 유효성 검사
  - AI 이미지 생성 서비스 연동
  - 생성된 이미지 임시 저장 및 URL 반환
  - 오류 처리 및 로깅

#### 2. 갤러리 저장 API 구현

- **파일 위치**: `app/api/gallery/route.ts`
- **기능**:
  - 이미지 파일 영구 저장소 이전
  - 메타데이터 DB 저장
  - 사용자 갤러리 연동
  - 저장 실패 시 롤백 처리

#### 3. 커뮤니티 공유 API 구현

- **파일 위치**: `app/api/community/post/route.ts`
- **기능**:
  - 게시물 메타데이터 검증
  - DB 저장 및 인덱싱
  - 태그 처리 및 검색 최적화
  - 공개 범위에 따른 접근 제어

#### 4. 테스트 항목

1. **이미지 생성 API**
   - 다양한 프롬프트 패턴에 대한 처리
   - 스타일 옵션 조합에 따른 결과 검증
   - 오류 상황 처리 및 복구
   - 성능 및 타임아웃 테스트

2. **갤러리 저장 API**
   - 파일 저장 정상 작동 확인
   - 메타데이터 저장 검증
   - 동시성 제어 테스트
   - 저장소 용량 관리

3. **커뮤니티 공유 API**
   - 게시물 생성 검증
   - 접근 제어 정책 테스트
   - 태그 시스템 작동 확인
   - 검색 인덱스 업데이트 확인 