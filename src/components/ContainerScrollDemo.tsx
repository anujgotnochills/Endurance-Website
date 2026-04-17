"use client";

import { ContainerScroll } from "./ui/container-scroll-animation";

export default function ContainerScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden w-full -mt-20 md:-mt-48">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-3xl sm:text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[#a855f7]">
                Visual Storytelling
              </span>
            </h1>
          </>
        }
      >
        <video
          src="/media/mac-vid.mp4"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          autoPlay
          muted
          loop
          playsInline
        />
      </ContainerScroll>
    </div>
  );
}
