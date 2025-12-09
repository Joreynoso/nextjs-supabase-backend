import { Mail, Shield, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
    const supabase = await createClient();

    // Get the user from the session
    const { data: { user }, error } = await supabase.auth.getUser()

    // Si hay error o no hay usuario, muestra un mensaje
    if (error || !user) {
        return (
            <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
                <h1 className='text-3xl font-extrabold tracking-tight mb-2'>User Profile</h1>
                <p className='text-destructive'>Error loading user information</p>
            </div>
        )
    }

    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-3xl font-extrabold tracking-tight mb-2'>User Profile</h1>
            <p className='text-muted-foreground text-base mb-8'>
                Here you can view your profile information. This section is secured by Supabase's private policy.
            </p>

            <div className='bg-card rounded-xl shadow-lg p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-semibold'>Profile Information</h2>
                </div>

                <div className='flex flex-col gap-4'>
                    {/* User ID */}
                    <div className='flex items-center gap-2'>
                        <User className='h-5 w-5 text-muted-foreground' />
                        <span className='text-sm font-medium text-muted-foreground'>User ID:</span>
                        <p className='font-mono text-sm'>{user.id}</p>
                    </div>

                    {/* Email */}
                    <div className='flex items-center gap-2'>
                        <Mail className='h-5 w-5 text-muted-foreground' />
                        <span className='text-sm font-medium text-muted-foreground'>Email:</span>
                        <p className='text-base'>{user.email}</p>
                    </div>

                    {/* Role */}
                    <div className='flex items-center gap-2'>
                        <Shield className='h-5 w-5 text-muted-foreground' />
                        <span className='text-sm font-medium text-muted-foreground'>Role:</span>
                        <p className='text-base capitalize'>{user.role}</p>
                    </div>

                    {/* Email Verified */}
                    <div className='flex items-center gap-2'>
                        <Mail className='h-5 w-5 text-muted-foreground' />
                        <span className='text-sm font-medium text-muted-foreground'>Email Verified:</span>
                        <p className='text-base'>
                            {user.user_metadata?.email_verified ? (
                                <span className='text-green-600 font-medium'>✓ Verified</span>
                            ) : (
                                <span className='text-amber-600 font-medium'>⚠ Not verified</span>
                            )}
                        </p>
                    </div>

                    {/* Provider */}
                    <div className='flex items-center gap-2'>
                        <Shield className='h-5 w-5 text-muted-foreground' />
                        <span className='text-sm font-medium text-muted-foreground'>Auth Provider:</span>
                        <p className='text-base capitalize'>{user.app_metadata?.provider}</p>
                    </div>
                </div>

                {/* Debug info (opcional, puedes quitarlo en producción) */}
                <details className='mt-8'>
                    <summary className='cursor-pointer text-sm text-muted-foreground hover:text-foreground'>
                        Show raw data (debug)
                    </summary>
                    <div className='mt-4 bg-muted rounded-lg p-4 overflow-auto'>
                        <pre className='text-xs'>{JSON.stringify(user, null, 2)}</pre>
                    </div>
                </details>
            </div>
        </div>
    )
}
