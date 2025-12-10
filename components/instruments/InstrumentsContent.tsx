// Este componente SÍ es async - hace el fetch de datos
import { createClient } from '@/lib/supabase/server'
import type { Instrument } from '@/types'
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Pencil, Trash } from 'lucide-react'

export default async function InstrumentsContent() {
    const supabase = await createClient()
    const { data: instruments } = await supabase.from('instruments').select()

    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-3xl font-semibold tracking-tight mb-2'>Instruments</h1>
            <p className='text-muted-foreground text-base mb-8'>
                Your personal space for instruments. This section is secured by Supabase's private policy.
            </p>

            {/* instruments list */}
            <div className='w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {instruments?.map((instrument: Instrument) => (
                    <Card key={instrument.id} className='bg-card rounded-xl shadow-lg flex flex-col justify-between overflow-hidden transition-all hover:shadow-xl'>
                        <CardHeader className='pb-4'>
                            <CardTitle className='text-lg font-semibold leading-snug'>{instrument.name}</CardTitle>
                        </CardHeader>
                        <CardFooter className='flex justify-end pt-2'>
                            <Button variant='ghost' size='icon' className='mr-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive'>
                                <Trash className='h-4 w-4' />
                            </Button>
                            <Button variant='ghost' size='icon' className='text-muted-foreground hover:bg-primary/10 hover:text-primary'>
                                <Pencil className='h-4 w-4' />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
