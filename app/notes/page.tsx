'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { JSX, useEffect, useState } from 'react'
import type { Note } from '@/types'

export default function Page() {
    const [notes, setNotes] = useState<Note[] | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }
        getData()
    }, [])

    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-2xl font-bold'>Notes</h1>
            <p className='text-sm text-muted-foreground mb-10'>Your notes, this section has a private policy from supabase.</p>

            {/* Notes section */}
            <div className='w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {notes?.map((note: Note) : JSX.Element => (
                    <Card key={note.id} className='bg-card rounded-lg shadow-md p-4'>
                        <CardHeader>
                            <CardTitle className='leading-relaxed'>{note.title}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}