import { Phone, MessageCircle, CheckCircle } from "lucide-react";

export const learningSteps = [
  {
    id: 1,
    number: 1,
    icon: <CheckCircle className="w-8 h-8 text-[#E4665A]" />,
    title: "ملء النموذج",
    description:
      "قم بملء النموذج القصير أعلاه بمعلوماتك الأساسية. هذه أول خطوة نحو إتقان العبرية.",
    bgColor: "bg-red-50",
    numberBgColor: "bg-[#E4665A]",
  },
  {
    id: 2,
    number: 2,
    icon: <MessageCircle className="w-8 h-8 text-[#0188D6]" />,
    title: "استلام رسالة ترحيبية",
    description: "بتوصلك رسالة وفيديو ترحيبي عالواتساب",
    bgColor: "bg-blue-50",
    numberBgColor: "bg-[#0188D6]",
  },
  {
    id: 3,
    number: 3,
    icon: <Phone className="w-8 h-8 text-[#E3B134]" />,
    title: "اختبار قصير واتصال",
    description: "اعمل تقييم اولي لمستواك وبنحكي معك شو الأنسب إلك",
    bgColor: "bg-amber-50",
    numberBgColor: "bg-[#E3B134]",
  },
];
