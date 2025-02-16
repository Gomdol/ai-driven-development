## Artify 디자인 가이드

### 1. 디자인 컨셉 및 원칙 (구현 완료)

**디자인 철학**  
- 직관적이고 접근성 높은 UI
- 창의적이고 세련된 느낌
- ShadCN 컴포넌트 기반 일관된 디자인

**사용자 경험 목표**  
1. **간편한 접근성**: 메인 화면의 프롬프트 입력으로 즉시 시작
2. **직관적인 UI**: ShadCN 컴포넌트로 일관된 사용자 경험
3. **즉각적인 피드백**: Sonner 토스트로 작업 결과 알림

### 2. 현재 구현된 UI 컴포넌트

#### 1. 버튼 (ShadCN Button)
```typescript
// components/ui/button.tsx
<Button variant="default">기본 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="destructive">삭제 버튼</Button>
```

#### 2. 입력 필드
```typescript
// components/ui/textarea.tsx - 프롬프트 입력
<Textarea placeholder="프롬프트를 입력하세요" />

// components/ui/input.tsx - 일반 텍스트 입력
<Input type="text" placeholder="입력해주세요" />
```

#### 3. 선택 컴포넌트
```typescript
// components/ui/select.tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택해주세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">옵션 1</SelectItem>
  </SelectContent>
</Select>
```

#### 4. 모달 및 다이얼로그
```typescript
// components/ui/dialog.tsx
<Dialog>
  <DialogTrigger>열기</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### 3. 색상 시스템 (현재 사용 중)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  // ... 다크모드 색상
}
```

### 4. 타이포그래피

현재 사용 중인 폰트 시스템:
```typescript
// app/layout.tsx
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
```

텍스트 스타일:
- 제목: GeistSans, 24-32px, Bold
- 부제목: GeistSans, 18-24px, SemiBold
- 본문: GeistSans, 14-16px, Regular
- 코드: GeistMono, 14px, Regular

### 5. 반응형 디자인

현재 구현된 브레이크포인트:
```css
/* tailwind.config.js */
screens: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

레이아웃 그리드:
- 모바일: 1컬럼
- 태블릿: 2컬럼
- 데스크톱: 3-4컬럼

### 6. 애니메이션 및 전환

현재 구현된 애니메이션:
- 버튼 호버: scale 효과
- 모달 전환: fade 효과
- 토스트 메시지: slide + fade 효과
- 로딩 스피너: rotate 애니메이션

### 7. 접근성

구현된 접근성 기능:
- ARIA 레이블 적용
- 키보드 네비게이션 지원
- 충분한 색상 대비
- 스크린 리더 호환성
