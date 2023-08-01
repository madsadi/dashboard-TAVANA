export default function Badge(props: any) {
    const { onClick, children } = props;

    return (
        <div className="bg-gray-200 rounded-md px-2 py-1" onClick={onClick}>
            {children}
        </div>
    )
}