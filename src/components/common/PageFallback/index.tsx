export function PageFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative mb-6">
        {/* Gradient orb background */}
        <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
        {/* Spinner */}
        <div className="w-10 h-10 rounded-full border-2 border-glass-border border-t-primary animate-spin" />
      </div>
      <p className="text-text-secondary text-sm">Loading...</p>
    </div>
  );
}
