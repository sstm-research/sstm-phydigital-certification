function Button({
  children,
  className,
  onClick,
  disabled,
  type,
}: Readonly<{
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "submit" | "reset" | "button" | undefined
}>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 border-2 border-stone-300 rounded-md ${disabled ? "cursor-not-allowed bg-slate-50 border-stone-100 text-slate-400" : ""} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
