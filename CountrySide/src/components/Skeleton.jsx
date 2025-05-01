import React from "react";

export const Skeleton = () => {
  return (
    <main className="pt-24 px-6 md:px-40 text-text font-lexend bg-background min-h-screen animate-pulse">
      <div className="h-10 w-1/3 bg-muted mb-6 rounded"></div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[400px] h-[300px] bg-muted rounded"></div>
        <div className="flex-1 space-y-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-full h-4 bg-muted rounded" />
            ))}
        </div>
      </div>
    </main>
  );
};
