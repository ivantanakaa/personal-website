'use client';

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-20 w-4 h-4 border-2 border-accent-primary/30 rotate-45 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-20 w-6 h-6 border-2 border-accent-light/30 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
}
