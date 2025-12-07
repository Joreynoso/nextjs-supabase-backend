export default function Loading() {
    
    // Render return
    return (
        <div className='w-full max-w-5xl mx-auto text-center py-10'>
            <div className='spinner-border animate-spin inline-block w-8 h-8 border-[3px] rounded-full' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    )
}   