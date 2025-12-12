'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { bytesToKB } from '@/lib/utils'
import { File } from 'lucide-react'

export default function SupabaseFiles() {

    // Local states
    const [files, setFiles] = useState<any[]>([])   
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

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
            const filteredData = data.filter((file) => file.name !== '.emptyFolderPlaceholder')
            setFiles(filteredData || [])
            console.log('files', filteredData)
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
        console.log('data.publicUrl', data.publicUrl)
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
        setLoading(false);
        setFile(null);
    }

    // Delete a file
    async function deleteFile(path: string) {
        console.log('1. entering deleteFile')
        console.log('path', path)
        const { error } = await supabase.storage.from(bucket).remove([path]);
        console.log('2. exiting deleteFile')
        if (error) {
            toast.error("Error to delete file");
            console.log(error);
            return;
        }

        toast.success("File deleted successfully");
        console.log('3. exiting deleteFile')
        // Refresh files list
        fetchFiles();
    }

    // Cancel selection
    function cancelSelection() {
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
                        disabled={loading}
                        className='w-full border-none focus-visible:ring-0'
                        placeholder='Select a file'
                    />
                    <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                        <Button variant="outline" onClick={cancelSelection} disabled={loading} className='flex-1 md:flex-none px-4 py-2'>Cancel</Button>
                        <Button disabled={loading} onClick={uploadFile} className='flex-1 md:flex-none px-4 py-2'>Upload File</Button>
                    </div>
                </div>
            </div>

            {/* Bucket section */}
            <h2 className='text-2xl font-semibold tracking-tight mb-2'>Bucket: {bucket}</h2>
            <p className='text-muted-foreground text-base mb-8'>Files current in bucket: {files.length}</p>

            {files.length === 0 ? (
                <div className='bg-card w-full max-w-5xl min-h-[200px] flex flex-col p-3 px-5 text-sm mx-auto py-10 justify-center items-center rounded-lg'>
                    <File className='w-8 h-8 text-muted-foreground mb-4' />
                    <p className='text-muted-foreground text-base'>No files found in bucket</p>
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {files.map((file: any) => (
                        <Card key={file.id} className='flex flex-col h-[320px]'> {/* Fixed height for the card */}
                            <CardHeader className='pb-4'>
                                <h3 className='text-sm font-semibold truncate'>{file.name}</h3> {/* Truncate long names */}
                                <p className='text-xs text-muted-foreground'>File size: {bytesToKB(file.metadata.size)} KB</p>
                            </CardHeader>
                            <CardContent className='flex-grow flex items-center justify-center p-0 px-6 h-[160px]'> {/* Fixed height for image container */}
                                <Image
                                    src={getPublicUrl(file.name)}
                                    alt={file.name}
                                    width={200}
                                    height={160} // Fixed height for the image
                                    className='w-full h-full object-cover rounded-lg' // Image fills its fixed height container
                                    unoptimized
                                    loading="eager"
                                />
                            </CardContent>
                            <CardFooter className='w-full flex items-center gap-2 pt-4 mt-auto'> {/* Push footer to bottom */}
                                <Button variant={'outline'} size="sm" className='px-4 py-2 w-full'>
                                    <Link href={`/supabase-files/${encodeURIComponent(file.name)}`} className='flex items-center gap-2'>
                                        See
                                    </Link>
                                </Button>
                                <Button variant={'outline'} size="sm" onClick={() => deleteFile(file.name)} disabled={loading} className='px-4 py-2 w-full'>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

        </div>
    )
}