// app/supabase-files/[file-name]/page.tsx
import { Suspense } from 'react'
import ImageDisplay from '@/components/supabase-files/ImageDisplay'
import Loading from '@/components/loading'

export default async function SupabaseFile({ params }: { params: Promise<{ 'file-name': string }> }) {
    return (
        <Suspense fallback={
            <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex items-center justify-center'>
                <Loading message='Loading image...'/>
            </div>
        }>
            <ImageDisplay params={params} />
        </Suspense>
    )
}