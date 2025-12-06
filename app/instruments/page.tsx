// ejemplo con renderizado en el servidor
import { createClient } from '@/lib/supabase/server'
import type { Instrument } from '@/types'
import { Suspense } from "react";
import InstrumentsList from '@/components/instrumentsList'

export default async function PageInstruments() {
  const supabase = await createClient()
  const { data: instruments }  = await supabase.from('instruments').select()

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
      {/* Header section */}
      <h1 className='text-2xl font-bold'>Instruments</h1>
      <p className='text-sm text-muted-foreground mb-10'>Your instruments, this section has a private policy from supabase.</p>

      <InstrumentsList instruments={instruments as Instrument[]} />
    </div>
    </Suspense>
  )
}