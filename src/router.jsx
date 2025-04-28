import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/index";
import Exam from "@/pages/Exam";

// Error component
function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          عذراً، حدث خطأ
        </h1>
        <p className="text-gray-600 mb-6">الصفحة التي تبحث عنها غير موجودة</p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          العودة إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/exam",
    element: <Exam />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);
