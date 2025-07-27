// Optimized imports - only import icons that are actually used
import {
  Baby,
  Users,
  User,
  Laugh,
  Heart,
  Sparkles,
  Star,
  Zap,
  Trophy,
  Briefcase,
  GraduationCap,
  Plane,
  Lightbulb,
  BookOpen,
  Coffee,
  MessageCircle,
  Building2,
  Globe,
  Smartphone,
  Laptop,
  Building,
  Video,
  ThumbsDown,
  Frown,
  Smile,
  ThumbsUp,
  Award,
  AlertCircle,
  XCircle,
  Flame,
  Battery,
  BatteryMedium,
  BatteryCharging,
  PersonStanding,
} from "lucide-react";

// Optimized icon components with memoization
const IconWrapper = ({ children, className = "h-5 w-5" }) => (
  <span className={`text-gray-600 flex-shrink-0 ${className}`}>
    {children}
  </span>
);

export const questions = [
  {
    id: "age_range",
    title: "ما هي الفئة العمرية الخاصة بك؟",
    options: [
      { value: "18-", label: "18-", icon: <IconWrapper><Baby /></IconWrapper> },
      {
        value: "18-24",
        label: "18-24",
        icon: <IconWrapper><PersonStanding /></IconWrapper>,
      },
      { value: "25-34", label: "25-34", icon: <IconWrapper><Users /></IconWrapper> },
      { value: "35-44", label: "35-44", icon: <IconWrapper><User /></IconWrapper> },
      { value: "45-54", label: "45-54", icon: <IconWrapper><Laugh /></IconWrapper> },
      { value: "55+", label: "55+", icon: <IconWrapper><Heart /></IconWrapper> },
    ],
    type: "single",
  },
  {
    id: "hebrew_level",
    title: "ما هو مستواك الحالي في اللغة العبرية؟",
    options: [
      {
        value: "beginner",
        label: "مبتدئ",
        description: "لا أعرف أي كلمات أو القليل جداً منها",
        icon: <IconWrapper className="h-6 w-6 text-blue-400"><Sparkles /></IconWrapper>,
      },
      {
        value: "elementary",
        label: "أساسي",
        description: "أعرف بعض الكلمات والعبارات البسيطة",
        icon: <IconWrapper className="h-6 w-6 text-yellow-400"><Star /></IconWrapper>,
      },
      {
        value: "intermediate",
        label: "متوسط",
        description: "يمكنني إجراء محادثات بسيطة",
        icon: <IconWrapper className="h-6 w-6 text-orange-400"><Zap /></IconWrapper>,
      },
      {
        value: "advanced",
        label: "متقدم",
        description: "أتحدث بطلاقة نسبياً ولكن أواجه بعض التحديات",
        icon: <IconWrapper className="h-6 w-6 text-green-500"><Trophy /></IconWrapper>,
      },
    ],
    type: "single",
  },
  {
    id: "motivation",
    title: "ما هو الدافع الرئيسي لتعلم اللغة العبرية؟",
    options: [
      {
        value: "work",
        label: "العمل",
        description: "أحتاج العبرية للتواصل في مكان العمل",
        icon: <IconWrapper className="h-6 w-6 text-blue-500"><Briefcase /></IconWrapper>,
      },
      {
        value: "study",
        label: "الدراسة",
        description: "أحتاج العبرية للدراسة أو البحث الأكاديمي",
        icon: <IconWrapper className="h-6 w-6 text-purple-500"><GraduationCap /></IconWrapper>,
      },
      {
        value: "family",
        label: "العائلة",
        description: "لدي أفراد عائلة يتحدثون العبرية",
        icon: <IconWrapper className="h-6 w-6 text-red-500"><Heart /></IconWrapper>,
      },
      {
        value: "travel",
        label: "السفر",
        description: "أخطط للسفر إلى إسرائيل أو زيارتها",
        icon: <IconWrapper className="h-6 w-6 text-teal-500"><Plane /></IconWrapper>,
      },
      {
        value: "personal_interest",
        label: "اهتمام شخصي",
        description: "مهتم باللغة والثقافة العبرية",
        icon: <IconWrapper className="h-6 w-6 text-yellow-500"><Lightbulb /></IconWrapper>,
      },
      {
        value: "religion",
        label: "ديني",
        description: "لأغراض دينية أو روحية",
        icon: <IconWrapper className="h-6 w-6 text-indigo-500"><BookOpen /></IconWrapper>,
      },
      {
        value: "other",
        label: "أخرى",
        description: "دافع آخر غير مذكور",
        icon: <IconWrapper className="h-6 w-6 text-orange-500"><Coffee /></IconWrapper>,
      },
    ],
    type: "single",
  },
  {
    id: "goal",
    title: "ما هو هدفك الذي تريد تحقيقه مع اللغة العبرية؟",
    options: [
      {
        value: "basic_conversation",
        label: "المحادثة الأساسية",
        description: "القدرة على التحدث في المواقف اليومية",
        icon: <IconWrapper className="h-6 w-6 text-blue-500"><MessageCircle /></IconWrapper>,
      },
      {
        value: "fluency",
        label: "الطلاقة",
        description: "التحدث بطلاقة كمتحدث أصلي تقريباً",
        icon: <IconWrapper className="h-6 w-6 text-yellow-500"><Zap /></IconWrapper>,
      },
      {
        value: "reading_writing",
        label: "القراءة والكتابة",
        description: "فهم النصوص المكتوبة والقدرة على الكتابة",
        icon: <IconWrapper className="h-6 w-6 text-purple-500"><BookOpen /></IconWrapper>,
      },
      {
        value: "professional",
        label: "المهنية",
        description: "استخدام العبرية في بيئة العمل",
        icon: <IconWrapper className="h-6 w-6 text-green-500"><Building2 /></IconWrapper>,
      },
      {
        value: "academic",
        label: "أكاديمية",
        description: "استخدام العبرية للدراسة أو البحث الأكاديمي",
        icon: <IconWrapper className="h-6 w-6 text-red-500"><GraduationCap /></IconWrapper>,
      },
      {
        value: "cultural",
        label: "ثقافية",
        description: "فهم الثقافة والأدب والإعلام العبري",
        icon: <IconWrapper className="h-6 w-6 text-teal-500"><Globe /></IconWrapper>,
      },
    ],
    type: "single",
  },
  {
    id: "previous_methods",
    title: "ما هي الطرق التي جربتها للتعلم؟",
    options: [
      {
        value: "mobile_app",
        label: "تطبيق جوال",
        icon: <IconWrapper className="h-6 w-6"><Smartphone /></IconWrapper>,
      },
      {
        value: "online_teacher",
        label: "معلم عبر الإنترنت",
        icon: <IconWrapper className="h-6 w-6"><Laptop /></IconWrapper>,
      },
      {
        value: "school",
        label: "المدرسة",
        icon: <IconWrapper className="h-6 w-6"><BookOpen /></IconWrapper>,
      },
      {
        value: "language_courses",
        label: "دورات اللغة",
        icon: <IconWrapper className="h-6 w-6"><Building /></IconWrapper>,
      },
      {
        value: "youtube",
        label: "يوتيوب",
        icon: <IconWrapper className="h-6 w-6"><Video /></IconWrapper>,
      },
    ],
    type: "multi",
  },
  {
    id: "feeling_confidence",
    title: "كيف تشعر عندما تحاول التحدث باللغة العبرية؟",
    options: [
      {
        value: "very_low",
        label: "منخفض جداً",
        description: "أشعر بالخجل الشديد وغير واثق على الإطلاق",
        icon: <IconWrapper className="h-6 w-6 text-red-500"><ThumbsDown /></IconWrapper>,
      },
      {
        value: "low",
        label: "منخفض",
        description: "أشعر بعدم الارتياح ونقص الثقة معظم الوقت",
        icon: <IconWrapper className="h-6 w-6 text-orange-500"><Frown /></IconWrapper>,
      },
      {
        value: "neutral",
        label: "محايد",
        description: "أشعر بالراحة في بعض المواقف وعدم الراحة في مواقف أخرى",
        icon: <IconWrapper className="h-6 w-6 text-yellow-500"><Smile /></IconWrapper>,
      },
      {
        value: "confident",
        label: "واثق",
        description: "أشعر بالراحة نسبياً عند التحدث بالعبرية",
        icon: <IconWrapper className="h-6 w-6 text-blue-500"><ThumbsUp /></IconWrapper>,
      },
      {
        value: "very_confident",
        label: "واثق جداً",
        description: "أشعر بالثقة التامة عند التحدث بالعبرية",
        icon: <IconWrapper className="h-6 w-6 text-green-500"><Award /></IconWrapper>,
      },
    ],
    type: "single",
  },
  {
    id: "feeling_frustration",
    title: "ما مدى شعورك بالإحباط عندما تحاول التعلم أو التحدث بالعبرية؟",
    options: [
      {
        value: "not_at_all",
        label: "لا أشعر بالإحباط على الإطلاق",
        description: "عملية التعلم سهلة وممتعة بالنسبة لي",
        icon: <IconWrapper className="h-6 w-6 text-green-500"><Smile /></IconWrapper>,
      },
      {
        value: "slightly",
        label: "أشعر بإحباط قليل",
        description: "أحيانًا أواجه بعض التحديات لكنها لا تزعجني كثيرًا",
        icon: <IconWrapper className="h-6 w-6 text-blue-500"><ThumbsUp /></IconWrapper>,
      },
      {
        value: "moderately",
        label: "أشعر بإحباط متوسط",
        description: "أواجه صعوبات ومواقف محبطة بشكل متكرر",
        icon: <IconWrapper className="h-6 w-6 text-yellow-500"><AlertCircle /></IconWrapper>,
      },
      {
        value: "very",
        label: "أشعر بإحباط كبير",
        description: "أشعر بالإحباط معظم الوقت عندما أحاول التحدث أو التعلم",
        icon: <IconWrapper className="h-6 w-6 text-orange-500"><Frown /></IconWrapper>,
      },
      {
        value: "extremely",
        label: "أشعر بإحباط شديد جدًا",
        description:
          "أشعر بالعجز والإحباط الشديد في كل مرة أحاول فيها استخدام العبرية",
        icon: <IconWrapper className="h-6 w-6 text-red-500"><XCircle /></IconWrapper>,
      },
    ],
    type: "single",
  },
  {
    id: "feeling_motivation",
    title: "كم أنت متحمس الآن لبدء رحلة تعلم العبرية معنا؟",
    options: [
      {
        value: "not_motivated",
        label: "غير متحمس",
        description: "أفتقد الدافع لمواصلة التعلم بسبب التجارب السابقة",
        icon: <IconWrapper className="h-6 w-6 text-red-500"><Battery /></IconWrapper>,
      },
      {
        value: "slightly_motivated",
        label: "متحمس قليلاً",
        description: "لدي بعض الاهتمام ولكن ليس لدي حافز قوي",
        icon: <IconWrapper className="h-6 w-6 text-orange-500"><BatteryMedium /></IconWrapper>,
      },
      {
        value: "moderately_motivated",
        label: "متحمس بشكل معتدل",
        description: "أنا مهتم بالتعلم ولكنني أحتاج إلى دفعة",
        icon: <IconWrapper className="h-6 w-6 text-yellow-500"><BatteryCharging /></IconWrapper>,
      },
      {
        value: "highly_motivated",
        label: "متحمس جداً",
        description: "أنا مصمم على تعلم العبرية وتحسين مهاراتي",
        icon: <IconWrapper className="h-6 w-6 text-blue-500"><Zap /></IconWrapper>,
      },
      {
        value: "extremely_motivated",
        label: "متحمس للغاية",
        description:
          "أنا شغوف وملتزم تماماً بإتقان اللغة العبرية مهما كلف الأمر",
        icon: <IconWrapper className="h-6 w-6 text-green-600"><Flame /></IconWrapper>,
      },
    ],
    type: "single",
  },
];
