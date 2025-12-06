import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Instrument } from '@/types'

export default function IstrumentsList({instruments}: {instruments: Instrument[]}) {

    // render return
    return (
        <div className='w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {instruments?.map((instrument: Instrument) => (
                <Card key={instrument.id} className='bg-card rounded-lg shadow-md p-4'>
                    <CardHeader>
                        <CardTitle>{instrument.name}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}