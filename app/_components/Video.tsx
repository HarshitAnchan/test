import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="relative ">
      <HeroVideoDialog
        className="dark:hidden block w-[95%]  mx-auto"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/SzECMUFTKLI"
        thumbnailSrc="https://github.com/user-attachments/assets/1878e99b-1866-4665-b302-0862ffbb608e"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
