import { useSearchFilters } from "hooks/useSearchFilters";
import React, {
  useEffect,
  useState,
  ReactElement,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import Modal from "../layout/modal";
import InputComponent from "../components/input-generator";
import { Button } from "../components/button/button";

type ModulesType = keyof typeof ModuleIdentifier;

interface EditWrapperProps {
  children: ReactElement;
  confirmHandler: (e: any, query: any) => void;
  selectedItem: any;
  title: string;
  ModalWidth?: "" | "max-w-3xl";
  module: ModulesType;
  subModule: string;
  loading: boolean;
}

export const EditWrapper = forwardRef((props: EditWrapperProps, ref) => {
  const {
    children,
    confirmHandler,
    selectedItem,
    title,
    ModalWidth = "max-w-3xl",
    module,
    subModule,
    loading,
  } = props;
  const [query, setQuery] = useState<any>({});
  const [modal, setModal] = useState(false);

  const { toolbar } = useSearchFilters(ModuleIdentifier[module], subModule);

  useEffect(() => {
    if (modal && toolbar) {
      let ToEdit = selectedItem;
      let initialValue: any = {};
      toolbar?.map((item: any) => {
        initialValue[item.title] = ToEdit?.[item.title];
      });
      setQuery(initialValue);
    }
  }, [modal, toolbar]);

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  useImperativeHandle(ref, () => ({
    modalHandler(state: boolean) {
      setModal(state);
    },
  }));

  return (
    <>
      <Modal
        title={title}
        ModalWidth={ModalWidth}
        setOpen={setModal}
        open={modal}
      >
        <div className="field mt-4">
          <form className={"grid grid-cols-2 gap-4"}>
            {toolbar?.map((item: any) => {
              return (
                <InputComponent
                  key={item.title}
                  query={query}
                  item={item}
                  setQuery={setQuery}
                  onChange={onChange}
                  dataHelper={selectedItem}
                />
              );
            })}
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label={"لغو"}
              className="bg-error"
              onClick={() => setModal(false)}
            />
            <Button
              label={"تایید"}
              className="bg-primary"
              type={"submit"}
              loading={loading}
              onClick={(e) => confirmHandler(e, query)}
            />
          </div>
        </div>
      </Modal>
      {children}
    </>
  );
});

EditWrapper.displayName = "EditWrapper";
