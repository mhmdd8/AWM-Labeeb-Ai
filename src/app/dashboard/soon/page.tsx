"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SoonPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <span className="text-2xl">📊</span>
      </div>

      <h2 className="text-2xl font-semibold">Analytics Coming Soon</h2>
      <p className="text-muted-foreground">
        We're working hard to bring you detailed insights about your activity.
      </p>

      <a
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
      >
        Go Back
      </a>
    </div>
  );
}
