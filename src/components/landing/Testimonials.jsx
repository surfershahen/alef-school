import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";

export default function Testimonials() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const videoTestimonials = [
    {
      name: "براء",
      quote: "تعلمت العبرية بسهولة وأصبحت أتحدث بطلاقة في العمل",
      video: "/assets/videos/Braa.mp4",
    },
    {
      name: "براء",
      quote: "تعلمت العبرية بسهولة وأصبحت أتحدث بطلاقة في العمل",
      video: "/assets/videos/0428 (1) copy.mov",
    },
    {
      name: "براء",
      quote: "تعلمت العبرية بسهولة وأصبحت أتحدث بطلاقة في العمل",
      video: "/assets/videos/0428(1) copy.mov",
    },
  ];

  const handleVideoClick = index => {
    if (playingVideo === index) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(index);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
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
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl bg-white body-font"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative h-[300px] overflow-hidden">
                {testimonial.video ? (
                  <>
                    <video
                      src={testimonial.video}
                      className="w-full h-full object-cover"
                      controls={playingVideo === index}
                      autoPlay={playingVideo === index}
                      loop
                    />
                    {playingVideo !== index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                        <button
                          onClick={() => handleVideoClick(index)}
                          className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform transform group-hover:scale-110 shadow-lg"
                        >
                          <PlayCircle className="w-10 h-10 text-[#E4665A]" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                      <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform transform group-hover:scale-110 shadow-lg">
                        <PlayCircle className="w-10 h-10 text-[#E4665A]" />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#1D1D1B] title-font">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 body-font">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
