import { cn } from "@/lib/utils"

type PaperProps = React.HTMLAttributes<HTMLDivElement>

const Paper = ({ children, className, ...props }: PaperProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-white px-6 py-4 shadow-lg shadow-zinc-200/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Paper
