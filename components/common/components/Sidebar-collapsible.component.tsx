import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function SidebarCollapsibleComponent({
  children,
  title,
  condition,
}: {
  children: any;
  title: string;
  condition: any;
}) {
  const [checked, isChecked] = useState(false);

  useEffect(() => {
    if (condition) {
      isChecked(true);
    }
  }, []);

  const hideTheComponent = () => {
    const hide = children.props.children.every(
      (item: any) => item.props.className === "hidden"
    );
    return hide;
  };

  return (
    <div
      className={`relative font-semibold collapse border rounded-md border-border transition-all hover:bg-gray-100 ${
        condition ? "bg-gray-100" : ""
      } ${hideTheComponent() ? "hidden" : ""}`}
    >
      <input
        type="checkbox"
        className="peer w-full h-full "
        checked={checked}
        onChange={(e) => isChecked(!checked)}
      />
      <div className={`collapse-title flex items-center bg-transparent p-2 `}>
        <h4 className={"text-right"}>{title}</h4>
        <div className={"min-w-7 mr-auto"}>
          {checked ? (
            <ChevronUpIcon className={"h-6 w-6 "} />
          ) : (
            <ChevronDownIcon className={"h-6 w-6 "} />
          )}
        </div>
      </div>
      <div
        className={`collapse-content bg-transparent ${
          checked ? "pb-4 max-h-[5000px]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
