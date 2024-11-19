import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <Loader2 className="animate-spin text-gray-600 dark:text-gray-400 h-16 w-16" />
    </div>
  );
};

export default LoadingPage;
