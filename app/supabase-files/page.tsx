'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Loading from '@/components/loading'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FileUpload from '@/components/supabase-files/upload-file'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Camera } from 'lucide-react'

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

    // Cancel selection
    function cancelSelection() {
        console.log('Cancel selection', file);
        setFile(null);
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
            <div className='mb-8 w-full bg-card p-4 rounded-lg flex justify-center items-center'>
                <div className='w-full border-dashed border-2 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 rounded-lg min-h-[100px] p-10'>
                    <Input
                        id="picture"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className='w-full border-none focus-visible:ring-0'
                        placeholder='Select a file'
                    />
                    <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                        <Button variant="outline" onClick={cancelSelection} className='flex-1 md:flex-none px-4 py-2'>Cancel</Button>
                        <Button onClick={uploadFile} className='flex-1 md:flex-none px-4 py-2'>Upload File</Button>
                    </div>
                </div>
            </div>

            {/* list of files */}
            {/* If exist files and loading is false */}
            {loading ? (
                <div className='flex items-center justify-center h-full'>
                    <Loading message='Loading files...' />
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {files.map((file: any) => (
                        <Card key={file.id} className='flex flex-col gap-2'>
                            <CardHeader>{file.name}</CardHeader>
                            <CardContent>
                                {/* <Image
                                    src='https://placehold.co/600x400'
                                    alt={file.name}
                                    width={200}
                                    height={200}
                                    className='w-full h-auto object-cover bg-card rounded-lg'
                                    unoptimized
                                    loading="eager"
                                /> */}
                                <div className='bg-background w-full h-auto object-cover rounded-lg min-h-[200px] flex justify-center items-center'>
                                    <Camera className='w-8 h-8 text-muted-foreground' />
                                </div>
                            </CardContent>  
                            <CardFooter className='flex items-center justify-end gap-2'>
                                <Button size="sm" onClick={() => deleteFile(file.path)} className='mt-2 px-4 py-2'>Delete</Button>
                                <Button size="sm" className='mt-2 px-4 py-2'>Download</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}