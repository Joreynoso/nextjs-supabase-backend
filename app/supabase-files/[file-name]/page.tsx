'use client'

export default function SupabaseFile({ params }: { params: Promise<{ file_name: string }> }) {


    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            <h1>Supabase File</h1>
            {/* <Image
                src={'https://storage.googleapis.com/' + bucket + '/' + file_name}
                alt={file_name}
                width={500}
                height={500}
                unoptimized
            /> */}
        </div>
    )
}   