'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { JSX, useEffect, useState } from 'react'
import type { Note } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function Page() {
    const [notes, setNotes] = useState<Note[] | null>(null)
    const [newNote, setNewNote] = useState('')
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }
        getData()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // validation
        if(!newNote.trim()) {
            toast.warning('Note is required')
            return
        }

        // get the user
        const { data: user} = await supabase.auth.getUser()

        // validate user
        if(!user) {
            toast.error('User not found')
            return
        }
    }

    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-2xl font-bold'>Notes</h1>
            <p className='text-sm text-muted-foreground mb-4'>Your notes, this section has a private policy from supabase.</p>

            {/* form add a new note */}
            <form onSubmit={handleSubmit} className='w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                <Input type="text" className='w-full' placeholder='Add a new note' value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
                <Button type="submit">Add note</Button>
            </form>

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