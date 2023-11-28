import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function DaisyAccordionComponent({
  children,
  title,
  extra,
}: {
  children: any;
  title: string;
  extra: any;
}) {
  return (
    <div className="relative collapse border border-border rounded-lg">
      <input type="checkbox" className="peer w-full h-full" />
      <div
        className={`collapse-title bg-transparent flex items-center px-2 py-2 peer-checked:hidden`}
      >
        <div className={"min-w-7"}>
          <ChevronLeftIcon className={"h-7 w-7 "} />
        </div>
        <h4 className={"text-right"}>{title}</h4>
        {extra}
      </div>
      <div
        className={`collapse-title bg-transparent hidden items-center px-2 py-2 peer-checked:flex transition-all`}
      >
        <div className={"min-w-7"}>
          <ChevronDownIcon className={"h-7 w-7 "} />
        </div>
        <h4 className={"text-right"}>{title}</h4>
        {extra}
      </div>
      <div className="collapse-content peer-checked:pt-5 peer-checked:border-t border-border bg-transparent">
        {children}
      </div>
    </div>
  );
}

DaisyAccordionComponent.defaultProps = {
  extra: "",
};
