import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Testimonials() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);

  const videoTestimonials = [
    {
      name: "براء",
      quote:
        "أنا كنت أفهم عبري، بس ما كنت أقدر أحكي! بعد دورة ألف فلوانس، بحكي بثقة بشغلي ",
      video: "assets/videos/Braa.mp4",
      poster: "assets/images/braa-poster.png",
    },
    {
      name: "احمد",
      quote: "تعلمت العبرية بسهولة وأصبحت أتحدث بطلاقة في العمل",
      video: "assets/videos/ahmad.mov",
      poster: "assets/images/ahmad-poster.png",
    },
    {
      name: "احلام",
      quote: "تعلمت أعبر عن حالي بالعبرية بوضوح، وفتحتلي فرص شغل!",
      video: "assets/videos/ahlam.mov",
      poster: "assets/images/ahlam-poster.png",
    },
    {
      name: "مريم",
      quote: "تعلمت العبرية بسهولة وأصبحت أتحدث بطلاقة في العمل",
      video: "assets/videos/maryem.mov",
      poster: "assets/images/maryam-poster.png",
    },
    {
      name: "ماريا",
      quote: "كل شي كان سهل وممتع، صرت أشرح حالي بالعبري بدون تردد! ",
      video: "assets/videos/maria.mov",
      poster: "assets/images/maria-poster.png",
    },
    {
      name: "عرين",
      quote: "تعلمت العبرية بسهولة وأصبحت أتحدث بطلاقة في العمل",
      video: "assets/videos/0428 (3).mov",
      poster: "assets/images/knowon-poster.png",
    },
  ];

  const handleVideoClick = index => {
    if (playingVideo === index) {
      setPlayingVideo(null);
      if (videoRefs.current[index]) {
        videoRefs.current[index].pause();
      }
    } else {
      setPlayingVideo(index);
      if (videoRefs.current[index]) {
        videoRefs.current[index].play();
      }
    }
  };

  // Initialize videoRefs array if needed
  if (videoRefs.current.length !== videoTestimonials.length) {
    videoRefs.current = Array(videoTestimonials.length)
      .fill()
      .map((_, i) => videoRefs.current[i] || null);
  }

  return (
    <>
      <SectionContainer className="bg-blue-50" hasDivider>
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1B] title-font">
            ماذا يقول طلابنا؟
          </h2>
          <p className="text-xl text-gray-600 mt-2 body-font">
            نتائج حقيقية من طلاب حقيقيين
          </p>
        </motion.div>
        {/* Video Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl bg-white body-font max-w-sm mx-auto w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative h-[220px] sm:h-[250px] overflow-hidden">
                {testimonial.video ? (
                  <>
                    <video
                      ref={el => (videoRefs.current[index] = el)}
                      src={testimonial.video}
                      className="w-full h-full object-cover"
                      controls={playingVideo === index}
                      playsInline
                      poster={testimonial.poster}
                    />
                    {playingVideo !== index && (
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center cursor-pointer"
                        onClick={() => handleVideoClick(index)}
                      >
                        <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform transform group-hover:scale-110 shadow-lg">
                          <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#E4665A]" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                      <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform transform group-hover:scale-110 shadow-lg">
                        <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#E4665A]" />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4 sm:p-6 bg-white text-center sm:text-right">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 mb-2 sm:mb-3 justify-center sm:justify-start">
                  <h3 className="font-bold text-lg text-[#1D1D1B] title-font">
                    {testimonial.name}
                  </h3>
                </div>
                <p className="text-gray-600 body-font text-sm sm:text-base">
                  {testimonial.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
