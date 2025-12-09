// Este componente ya NO es async - se renderiza inmediatamente
import InstrumentsContent from '@/components/instruments/InstrumentsContent';
import { Suspense } from "react";
import Loading from '@/components/loading';
import ProfileContent from '@/components/profile/ProfileContent';

export default function PageInstruments() {
  return (
    <Suspense fallback={
      <div className='w-full max-w-5xl min-h-[calc(100vh-120px)] flex flex-col p-3 px-5 text-sm mx-auto py-10'>
        <Loading message="Loading profile..." />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  )
}