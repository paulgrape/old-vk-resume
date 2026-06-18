type DividerProps = {
  className?: string
}

export function Divider({ className = 'mx-2 my-2' }: DividerProps) {
  return <div className={`border-t border-vk-border ${className}`.trim()} />
}
