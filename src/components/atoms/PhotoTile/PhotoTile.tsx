type PhotoTileProps = {
  hue: number
  saturation?: number
  lightness: number
  className?: string
}

export function PhotoTile({
  hue,
  saturation = 30,
  lightness,
  className = 'aspect-square',
}: PhotoTileProps) {
  return (
    <div
      className={className}
      style={{ background: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
    />
  )
}
