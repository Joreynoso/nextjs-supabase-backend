'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Loading from '@/components/loading'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FileUpload from '@/components/supabase-files/upload-file'

export default function SupabaseFiles() {

    // Local states
    const [files, setFiles] = useState<any[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Bucket from supabase
    const bucket = "images"

    // Supabase client
    const supabase = createClient()

    // List files from Supabase
    async function fetchFiles() {
        setError(null)
        setLoading(true)

        try {
            const { data, error } = await supabase.storage.from(bucket).list()
            if (error) throw error
            setFiles(data || [])
        } catch (error) {
            console.log('error', error as Error)
            toast.error('Error loading files')
        } finally {
            setLoading(false)
        }

    }

    // Get public url
    function getPublicUrl(path: string) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(path)
        return data.publicUrl
    }

    // Upload a file
    async function uploadFile() {
        if (!file) return toast.error("Select a file");

        setLoading(true);
        const fileName = `${Date.now()}-${file.name}`; // Avoid file name conflicts

        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
            cacheControl: "3600", // Cache for 1 hour
            upsert: false, // Not update if file already exists
        });

        setLoading(false);

        if (error) {
            toast.error("Error to upload file: " + error.message);
            console.log(error);
            return;
        }

        toast.success("File uploaded successfully");
        setFile(null);
        // Refresh files list
        fetchFiles();
    }

    // Delete a file
    async function deleteFile(path: string) {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) {
            toast.error("Error to delete file");
            console.log(error);
            return;
        }

        toast.success("File deleted successfully");
        // Refresh files list
        fetchFiles();
    }

    // useEffect
    useEffect(() => {
        fetchFiles()
    }, [])

    // render return
    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-3xl font-semibold tracking-tight mb-2'>Supabase Files</h1>
            <p className='text-muted-foreground text-base mb-8'>In this section, you can manage your files stored in Supabase.</p>

            {/* Upload section */}
            <div className='mb-8 w-full bg-card p-4 rounded-lg'>
                
            </div>

            {/* list of files */}
            {loading ? (
                <div className='flex items-center justify-center h-full'>
                    <Loading message='Loading files...' />
                </div>
            ) : (
                <div className='flex flex-col gap-2'>
                    {files.map((file: any) => ( 
                        <div key={file.id} className='flex items-center gap-2'>
                            <Image src={getPublicUrl(file.path)} width={100} height={100} alt={file.name} />
                            <p>{file.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}