
// imports
import { createClient } from '@/lib/supabase/server'

// component
export default async function ImageDisplay({ params }: { params: Promise<{ 'file-name': string }> }) {

    const { 'file-name': fileName } = await params
    const supabase = await createClient()

    const { data: file } = supabase.storage.from('images').getPublicUrl(fileName)
    const publicUrl = file.publicUrl

    // render
    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-3xl font-semibold tracking-tight mb-2'>Image</h1>
            <p className='text-muted-foreground text-base mb-8'>{fileName}</p>

            {/* Mostrar la imagen */}
            {publicUrl ? (
                <div className='w-full max-w-5xl max-h-[600px] mx-auto bg-card rounded-lg p-10 flex items-center justify-center overflow-hidden'>
                    <img
                        src={publicUrl}
                        alt={fileName}
                        className='max-w-full max-h-full object-contain rounded-lg border'
                    />
                </div>
            ) : (
                <div className='w-full max-w-5xl max-h-[600px] mx-auto bg-card rounded-lg p-10 flex items-center justify-center text-muted-foreground'>
                    <p className='text-lg'>Image not found or could not be loaded.</p>
                </div>
            )}

        </div>
    )
}