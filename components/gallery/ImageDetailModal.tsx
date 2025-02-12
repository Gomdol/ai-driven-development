import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockGalleryImages } from '@/utils/mocks/gallery'
import { IImageDetailModalProps } from '@/types'

export function ImageDetailModal({ imageId, onClose }: IImageDetailModalProps) {
  const image = mockGalleryImages.find(img => img.id === imageId)
  
  if (!image) return null

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          {/* 이미지 */}
          <div>
            <img
              src={image.url}
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* 정보 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">프롬프트</h3>
              <p className="text-sm text-gray-600">{image.prompt}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">스타일 옵션</h3>
              <pre className="text-sm bg-gray-50 p-2 rounded">
                {JSON.stringify(image.styleOptions, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-medium mb-1">태그</h3>
              <Input
                value={image.tags.join(', ')}
                onChange={() => {}}
                placeholder="태그 추가 (쉼표로 구분)"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => {}}>다운로드</Button>
              <Button variant="outline" onClick={() => {}}>커뮤니티 공유</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 