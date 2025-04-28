import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WhatsAppTestimonials() {
  const testimonials = [
    {
      name: "דונא אבוחארגא",
      messages: [
        {
          text: "الكورس كبير حلو كثير كثير وحبيت كيف لمعلمة بتشارك معنا انو بتعطي معنا واحنا كطلاب كثير بنشارك وهاي الاشي كثير حلو وتعلمت من الكورس كثير كلمات مكنتش أعرفها",
          time: "14:12",
          type: "received",
        },
        {
          text: "وشكراً كبير الكم وللمعلمة 🙏 ❤️",
          time: "14:16",
          type: "received",
        },
        {
          text: "شكرا الك كبير على رأيك ❤️ يسعدنا كثير استفادتك وتقدمك بالكورس ومحبتك للمجموعة 🥰🥰",
          time: "16:42",
          type: "sent",
        },
      ],
      image:
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e5822b_testimonials-5.jpeg",
    },
    {
      name: "יעל",
      messages: [
        {
          text: "צוהרים טובים יעל",
          time: "14:41",
          type: "received",
        },
        {
          text: "סליחה על האיחור",
          time: "14:41",
          type: "received",
        },
        {
          text: "בבקשה יעל חשוב לי לשמור על סדירות כשם",
          time: "14:43",
          type: "received",
        },
        {
          text: "שלום יעל, כמתחילה רציתי להגיד לך תודה רבה על המאמץ בכול השיעורים, מהתחילת הקורס עד היום יש התקדמות משמעותית בדיבור, מוזכרת בצורה נכונה עם כמעט עצמי. יעל מורה משתמשת בשיטות לימוד מגוונות המסייעות להבנת החומר ואף להנאה ממנו... נלמדת גם בזמן-מורה סבלנית, התנהלות על פי הקצב האישי",
          time: "14:43",
          type: "received",
        },
        {
          text: "באמת זה כתוב מהלב",
          time: "14:44",
          type: "received",
        },
        {
          text: "את מורה מדהימה 😍",
          time: "14:44",
          type: "received",
        },
        {
          text: "תודה רבה!",
          time: "14:45",
          type: "sent",
        },
      ],
      image:
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cb45b9_testimonials-3.jpeg",
    },
    {
      name: "أم جنى",
      messages: [
        {
          text: "صباح الخير ....كثير شكرا على هالفتره تبعت الدوره ....البنت جدا استفادت وخساره انو خلصت.....شكرا كثير الكوا وللمعلمه وعنجد مهنيه بتقديم الماده وطرحها للاولاد ....وان شاء الله راح يكون استمراريه لتسجيل لكمان دوره عبري ....✅",
          time: "10:18",
          type: "received",
        },
        {
          text: "صباح الورد 🌹 شكرا الك كبييير على كلماتك اللطيفه والمحفزه 🥰 بسعدنا جدا انها استفادت من الدوره وحست بتقدم واهم اشي انها كانت مرتاحه ومبسوطه 🙏",
          time: "13:24",
          type: "sent",
        },
        {
          text: "اكيد",
          time: "13:24",
          type: "received",
        },
      ],
      image:
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a5b3fc_testimonials-5.png",
    },
    {
      name: "רינה",
      messages: [
        {
          text: "ההודעה נמחקה",
          time: "14:40",
          type: "received",
        },
        {
          text: "צהרים טובים יעל",
          time: "14:41",
          type: "received",
        },
        {
          text: "סליחה על האיחור",
          time: "14:41",
          type: "received",
        },
        {
          text: "בבקשה יעל חשוב לי לשמור על סדירות כשם",
          time: "14:43",
          type: "received",
        },
        {
          text: "שלום יעל, כמתחילה רציתי להגיד לך תודה רבה על המאמץ בכול השיעורים. מהתחילת הקורס עד היום יש התקדמות משמעותית בדיבור, מוזכרת בצורה נכונה עם כמעט עצמי. יעל מורה משתמשת בשיטות לימוד מגוונות המסייעות להבנת החומר ואף להנאה ממנו... נלמדת גם בזמן-מורה סבלנית, התנהלות על פי הקצב האישי.",
          time: "14:43",
          type: "received",
        },
        {
          text: "באמת זה כתוב מהלב",
          time: "14:44",
          type: "received",
        },
        {
          text: "את מורה מדהימה 😍",
          time: "14:44",
          type: "received",
        },
        {
          text: "תודה רבה!",
          time: "14:45",
          type: "sent",
        },
      ],
      image:
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d4f854_testimonials-2.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Longer duration to give people time to read
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold title-font">
            آراء طلابنا على الواتساب
          </h2>
          <p className="text-xl text-gray-600 mt-2 body-font">
            تجارب حقيقية من طلاب حقيقيين
          </p>
        </motion.div>

        <div className="relative max-w-md mx-auto">
          {/* WhatsApp chat UI */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Just show the image */}
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={testimonials[currentIndex].image}
                alt="Student testimonial"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between p-3 bg-white">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex gap-1 items-center">
                {testimonials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-6 bg-[#25D366]"
                        : "w-2 bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
