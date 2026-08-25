type VideoBackgroundProps = {
  src: string
  className?: string
  poster?: string
}

export function VideoBackground({ src, className = '', poster }: VideoBackgroundProps) {
  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
