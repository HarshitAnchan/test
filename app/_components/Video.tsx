import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="relative max-w-6xl mx-auto p-4 rounded-lg ">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="/video.mp4"
        thumbnailSrc="/dashboard.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
