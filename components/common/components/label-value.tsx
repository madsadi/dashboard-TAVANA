export default function LabelValue({
  title,
  value,
  className,
}: {
  title: string;
  value: any;
  className?: string;
}) {
  return (
    <div className={"space-y-1 " + className}>
      {title && <div className={"font-light text-sm"}>{title}:</div>}
      <div className={"font-semibold text-base"}>{value ? value : "-"}</div>
    </div>
  );
}
