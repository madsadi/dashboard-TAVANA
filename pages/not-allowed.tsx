import { useRouter } from "next/router"

export const NotAllowed=()=>{
    const router = useRouter()
    return(
        <div className={'flex flex-col h-full grow border border-border shadow-md rounded-md bg-gray-50'}>
            <div className="text-center m-auto w-full">
            <h2> شما دسترسی لازم به این صفحه را ندارید</h2>
            <button
              type="button"
              className="bg-gray-400 rounded px-4 py-2 mt-5"
              onClick={() => {
                router.back()
              }}
            >
              برگرد به قبل
            </button>
          </div> 
        </div>
    )
}