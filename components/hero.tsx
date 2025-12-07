'use client'

import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Hero() {

  return (
    <div className="flex flex-col min-h-[600px] items-center justify-center font-sans bg-background">
      <Badge variant={'outline'} className='mb-4'>Autenticación con Supabase y Next.js</Badge>
      <h1 className='max-w-5xl text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-8 leading-[1.1]'>
        <span className="text-primary">Supabase</span> como backend para tu app Next.js
      </h1>

      <p className='max-w-2xl text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed font-medium'>
        Regístrate para probar un sistema de autenticación robusto y escalable, impulsado por Supabase y Next.js.
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        {/* registarse */}
        <Button variant="default" size="lg" className="text-base font-semibold min-w-[160px]">
          <Link href="/auth/sign-up">Registrarse</Link>
        </Button>

        {/* iniciar sesión */}
        <Button variant="outline" size="lg" className="text-base font-semibold min-w-[160px]">
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>
      </div>
    </div>
  );
}

import { toast } from "sonner"

export function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>
    </div>
  )
}

