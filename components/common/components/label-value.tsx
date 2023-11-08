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
    <div className={"space-y-2 " + className}>
      {title && <div className={"font-light"}>{title}:</div>}
      <div className={"font-semibold text-base"}>{value ? value : "-"}</div>
    </div>
  );
}
