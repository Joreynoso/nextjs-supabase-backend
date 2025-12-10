import { Suspense } from 'react';
import { AuthButton } from './auth-button';
import { EnvVarWarning } from './env-var-warning';
import { hasEnvVars } from '@/lib/utils';
import Link from 'next/link';
import MenuDropdown from './menu-dropdown';

export default function Navbar() {

    // render return
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>Next.js Supabase</Link>
                    </div>
                </div>


                <div className="flex items-center gap-3">
                    {/* Renderizado condicional basado en si las variables de entorno están configuradas */}
                    {!hasEnvVars ? (
                        // Muestra una advertencia si las variables de entorno no están configuradas
                        <EnvVarWarning />
                    ) : (
                        // Suspense para manejar la carga asíncrona del AuthButton
                        <Suspense>
                            {/* Botón de autenticación para iniciar sesión/cerrar sesión */}
                            <AuthButton />
                        </Suspense>
                    )}

                    {/* instruments and notes */}
                    <MenuDropdown />
                </div>
            </div>
        </nav>
    )
}