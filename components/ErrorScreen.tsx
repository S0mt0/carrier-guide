"use client";

import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-[#1B4332] mb-2">Oops! Something went wrong</h2>
      <p className="text-[#636E72] max-w-md mx-auto mb-6">
        {error}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Please check your internet connection and try again.
      </p>
      <Button
        onClick={onRetry}
        className="bg-[#1B4332] hover:bg-[#0f2818]"
      >
        Try Again
      </Button>
    </div>
  );
}
