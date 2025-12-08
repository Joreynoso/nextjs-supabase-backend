export default function Loading({ message }: { message?: string }) {
    return (
        <div className='w-full max-w-5xl flex flex-col items-center justify-center p-3 px-5 text-sm mx-auto py-10'>
            <div className='text-center'>{message}</div>
            <div className='mt-4 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
        </div>
    )
}