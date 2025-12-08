// Este componente SÍ es async - hace el fetch de datos
import { createClient } from '@/lib/supabase/server'
import type { Instrument } from '@/types'
import InstrumentsList from '@/components/instrumentsList'
import { Card, CardHeader, CardTitle } from '../ui/card'

export default async function InstrumentsContent() {
    const supabase = await createClient()
    const { data: instruments } = await supabase.from('instruments').select()

    return (
        <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
            {/* Header section */}
            <h1 className='text-3xl font-extrabold tracking-tight mb-2'>Instruments</h1>
            <p className='text-muted-foreground text-base mb-8'>
                Your personal space for instruments. This section is secured by Supabase's private policy.
            </p>

            {/* instruments list */}
            <div className='w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {instruments?.map((instrument: Instrument) => (
                    <Card key={instrument.id} className='bg-card rounded-lg shadow-md p-4'>
                        <CardHeader>
                            <CardTitle>{instrument.name}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
