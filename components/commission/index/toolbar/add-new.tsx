import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { useContext, useState } from "react";
import { CommissionContext } from "../../../../pages/commission-management/commission";
import { ADMIN_GATEWAY } from "../../../../api/constants";
import useMutation from "../../../../hooks/useMutation";
import { throwToast } from "../../../../utils/notification";
import Modal from "../../../common/layout/modal";
import InputComponent from "../../../common/components/input-generator";
import { Button } from "../../../common/components/button/button";

export default function AddCommission() {
  const { toolbar, restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.COMMISSION_MANAGEMENT_detail,
    "add"
  );
  const {
    fetchData,
    query: searchQuery,
    ids,
  } = useContext<any>(CommissionContext);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/CommissionDetail/Add`,
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const addNewHandler = async (e: any) => {
    e.preventDefault();
    let { CommissionInstrumentTypeTitle, CommissionCategoryTitle, ...rest } =
      query;
    setLoading(true);
    await mutate({
      ...rest,
      commissionInstrumentTypeId: ids?.CommissionInstrumentTypeId,
      commissionCategoryId: ids?.CommissionCategoryId,
    })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
        setQuery(null);
        fetchData(searchQuery);
      })
      .catch((err) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  const openHandler = () => {
    if (ids?.CommissionInstrumentTypeId && ids?.CommissionCategoryId) {
      setQuery({
        ...query,
        commissionInstrumentTypeTitle: ids?.CommissionInstrumentTypeTitle,
        commissionCategoryTitle: ids?.CommissionCategoryTitle,
      });
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value:
          "برای ایجاد کارمزد جدید لطفا ابتدا، ابزار مالی و گروه بندی ضرایب مورد نظر را از طریق جستجو کردن انتخاب کنید",
      });
    }
  };

  return (
    <>
      <Button
        label="ایجاد کارمزد"
        onClick={openHandler}
        className="bg-primary"
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
            : []
        }
      />
      <Modal
        title={"ایجاد کارمزد"}
        ModalWidth={"max-w-7xl"}
        setOpen={setModal}
        open={modal}
      >
        <div className="field mt-4">
          <form className={"grid lg:grid-cols-4 grid-cols-2 gap-4"}>
            {toolbar.map((item: any) => {
              if (item?.children) {
                return (
                  <div className={"w-full"} key={item.title}>
                    <label className={"mb-1 font-bold"}>{item.name}</label>
                    <div className={"flex"}>
                      {item?.children.map((child: any) => {
                        return (
                          <InputComponent
                            key={child.title}
                            query={query}
                            setQuery={setQuery}
                            item={child}
                            onChange={onChange}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={"mt-auto"} key={item.title}>
                    <InputComponent
                      query={query}
                      setQuery={setQuery}
                      item={item}
                      onChange={onChange}
                    />
                  </div>
                );
              }
            })}
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label="لغو"
              onClick={(e) => {
                e.preventDefault();
                setModal(false);
              }}
              className="bg-error"
            />
            <Button
              label="تایید"
              type={"submit"}
              onClick={addNewHandler}
              loading={loading}
              className="bg-primary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
