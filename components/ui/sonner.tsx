"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position='top-center'
      closeButton={true}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "bg-card text-card-foreground border-border shadow-lg",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
          cancelButton: "bg-muted text-muted-foreground hover:bg-muted/80",
          closeButton: "bg-card text-card-foreground border-border hover:bg-muted/50",
          success: "bg-card text-card-foreground border-border",
          error: "bg-card text-card-foreground border-border",
          warning: "bg-card text-card-foreground border-border",
          info: "bg-card text-card-foreground border-border",
        },
      }}
      style={{
        "--normal-bg": "hsl(var(--card))",
        "--normal-border": "hsl(var(--border))",
        "--normal-text": "hsl(var(--card-foreground))",
        "--success-bg": "hsl(var(--card))",
        "--success-border": "hsl(var(--border))",
        "--success-text": "hsl(var(--card-foreground))",
        "--error-bg": "hsl(var(--card))",
        "--error-border": "hsl(var(--border))",
        "--error-text": "hsl(var(--card-foreground))",
        "--warning-bg": "hsl(var(--card))",
        "--warning-border": "hsl(var(--border))",
        "--warning-text": "hsl(var(--card-foreground))",
        "--info-bg": "hsl(var(--card))",
        "--info-border": "hsl(var(--border))",
        "--info-text": "hsl(var(--card-foreground))",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }  