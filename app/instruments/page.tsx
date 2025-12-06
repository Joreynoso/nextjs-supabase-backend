// ejemplo con renderizado en el servidor
import { createClient } from '@/lib/supabase/server'
import type { Instrument } from '@/types'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from "react";

export default async function PageInstruments() {
  const supabase = await createClient()
  const { data: instruments } = await supabase.from('instruments').select()

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
      {/* Header section */}
      <h1 className='text-2xl font-bold'>Instruments</h1>
      <p className='text-sm text-muted-foreground mb-10'>Your instruments, this section has a private policy from supabase.</p>

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
    </Suspense>
  )
}