import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="relative ">
      <HeroVideoDialog
        className="dark:hidden block w-[95%]  mx-auto"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/SzECMUFTKLI"
        thumbnailSrc="https://private-user-images.githubusercontent.com/88927163/397985077-1878e99b-1866-4665-b302-0862ffbb608e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ4NzA3NzcsIm5iZiI6MTczNDg3MDQ3NywicGF0aCI6Ii84ODkyNzE2My8zOTc5ODUwNzctMTg3OGU5OWItMTg2Ni00NjY1LWIzMDItMDg2MmZmYmI2MDhlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjIyVDEyMjc1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWE1ZmIwMmE4YjNiODI1MDNmMTNkZmY3NDQ3YmRjMTEwMDc3OTYyODM2ZGZiNTY0NTM1NDM3MmIxOTg4NDIzNWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.urxPD1ZyW3-R33Hx_TfFIM1eAO6rbmT98KfJpVFIvGo"
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
