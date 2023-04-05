export default function LabelValue ({title,value}:{title:string,value:any}){
    return (
        <div className={'space-y-2'}>
            {title && <div className={'font-light'}>
                {title}:
            </div>}
            <div className={'font-semibold text-base'}>
                {value}
            </div>
        </div>
    )
}