import ImageGenerationSection from "@/app/home/ImageGenerationSection"
import CommunityFeedSection from "@/app/home/CommunityFeedSection"

export default function Home() {
    return (
        <main className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <ImageGenerationSection />
                
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold mb-8">커뮤니티 피드</h2>
                    <CommunityFeedSection />
                </div>
            </div>
        </main>
    )
}
