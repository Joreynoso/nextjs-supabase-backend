import Link from 'next/link';
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Hero() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] items-center justify-center font-sans bg-background">
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
