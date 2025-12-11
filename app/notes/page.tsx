'use client'

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { JSX, useEffect, useState } from 'react'
import type { Note } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Trash, Pencil } from 'lucide-react'

export default function Page() {
    const [notes, setNotes] = useState<Note[] | null>(null)
    const [newNote, setNewNote] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    // Get data
    const getData = async () => {
        const { data } = await supabase.from('notes').select()
        setNotes(data)
    }

    // Delete data
    const deleteData = async (id: string) => {
        const { error } = await supabase.from('notes').delete().eq('id', id)
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success('Note deleted successfully')
    }

    // Handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // validation
        if (!newNote.trim()) {
            toast.warning('Note is required')
            setLoading(false)
            return
        }

        // get the user
        const { data: user } = await supabase.auth.getUser()

        // validate user
        if (!user || !user.user) {
            toast.error('User not found')
            setLoading(false)
            return
        }

        // add the note
        const { data, error } = await supabase.from('notes').insert([
            {
                title: newNote,
                user_id: user.user.id
            }
        ])

        // validation
        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        }

        // reset the form
        setNewNote('')
        setLoading(false)

        // toast
        toast.success('Note added successfully')
    }

    // Handle changes
    useEffect(() => {
        getData()
        // Subscribe to realtime channel
        const channel = supabase
            .channel('notes')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'notes',
            }, (payload) => {
                console.log('Change received!', payload)
                getData()
            })
            .subscribe((status) => {
                console.log('Subscription status:', status)
            })

        // Cleanup subscription
        return () => {
            channel.unsubscribe()
        }
    }, [])

    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-3xl font-semibold tracking-tight mb-2'>Notes</h1>
            <p className='text-muted-foreground text-base mb-8'>Your personal space for thoughts. This section is secured by Supabase's private policy.</p>

            {/* form add a new note */}
            <form onSubmit={handleSubmit} className='w-full mx-auto flex gap-4 mb-12'>
                <Input type="text" className='flex-grow text-base py-2 px-4 h-11' placeholder='Add a new note...' value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                <Button type="submit" className='min-w-[120px] h-11 font-semibold text-base' disabled={loading}>
                    {loading ? 'Adding...' : 'Add note'}
                </Button>
            </form>

            {/* Notes section */}
            <div className='w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes?.map((note: Note): JSX.Element => (
                    <Card key={note.id} className='bg-card rounded-xl shadow-lg flex flex-col justify-between overflow-hidden transition-all hover:shadow-xl'>
                        <CardHeader className='pb-4'>
                            <CardTitle className='text-lg font-semibold leading-snug'>{note.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className='flex justify-end pt-2'>

                            {/* delete button */}
                            <Button variant='ghost' size='icon' className='mr-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive' 
                            onClick={() => deleteData(note.id)}>
                                <Trash className='h-4 w-4' />
                            </Button>

                            {/* edit button */}
                            <Button variant='ghost' size='icon' className='text-muted-foreground hover:bg-primary/10 hover:text-primary' 
                            onClick={() => toast.warning('edit the data here')} >
                                <Pencil className='h-4 w-4' />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div >
    )
}