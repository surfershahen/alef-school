import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollToForm from "./ScrollToForm";

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoPlaying]);

  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-white pt-32 pb-8 px-4 sm:px-6 lg:pt-40 lg:pb-14">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-[#E3B134] opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-[#0188D6] opacity-5 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold leading-tight mb-4 title-font"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              تعلّم العبرية بسهولة
              <span className="block text-[#0188D6]">بدون ضغط، فقط نجاح</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-700 mb-6 body-font"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              انضم إلى مئات المتحدثين بالعربية الذين أتقنوا العبرية معنا.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ScrollToForm className="bg-[#E4665A] hover:bg-[#d13a3a] text-white font-bold rounded-md px-10 py-6 text-lg transition-all shadow-lg hover:shadow-xl body-font inline-flex items-center">
                احجز مكاني الآن
                <ChevronRight className="mr-2 w-5 h-5" />
              </ScrollToForm>
            </motion.div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 z-10">
            <motion.div
              className="relative rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {!isVideoPlaying ? (
                <div className="relative">
                  <video
                    src="assets/videos/about-us.mp4"
                    className="w-full h-[300px] md:h-[350px] object-cover"
                    poster="assets/videos/poster.png"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 rounded-full bg-white  flex items-center justify-center transition-transform transform hover:scale-110"
                    >
                      <PlayCircle className="w-16 h-16 text-[#E4665A]" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0  p-4 text-white">
                    <p className="font-medium body-font">
                      شاهد الفيديو: كيف تتقن العبرية خلال أسابيع
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative pt-[56.25%]">
                  <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full rounded-2xl bg-transparent "
                    src="assets/videos/about-us.mp4"
                    controls
                    autoPlay
                    loop
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
