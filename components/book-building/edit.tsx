import React, { useContext, useState } from "react";
import Modal from "../common/layout/modal";
import moment from "jalali-moment";
import InputComponent from "../common/components/input-generator";
import { jalali } from "../../utils/common-funcions";
import { throwToast } from "../../utils/notification";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { Button } from "../common/components/button/button";
import { BookBuildingContext } from "pages/book-building";

export default function EditModal() {
  const { toolbar, restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.BOOK_BUILDING,
    "edit"
  );
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/EditBookBuilding`,
    method: "PUT",
  });
  const { selectedRows } = useContext<any>(BookBuildingContext);
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openUpdate = () => {
    if (selectedRows.length) {
      let _date: any = {};
      _date["from"] = {
        year: Number(
          jalali(selectedRows[0]?.fromActiveDateTime).date.split("/")[0]
        ),
        month: Number(
          jalali(selectedRows[0]?.fromActiveDateTime).date.split("/")[1]
        ),
        day: Number(
          jalali(selectedRows[0]?.fromActiveDateTime).date.split("/")[2]
        ),
      };
      _date["to"] = {
        year: Number(
          jalali(selectedRows[0]?.toActiveDateTime).date.split("/")[0]
        ),
        month: Number(
          jalali(selectedRows[0]?.toActiveDateTime).date.split("/")[1]
        ),
        day: Number(
          jalali(selectedRows[0]?.toActiveDateTime).date.split("/")[2]
        ),
      };
      setQuery({
        ...selectedRows[0],
        StartDate: moment(selectedRows[0].fromActiveDateTime)
          .locale("en")
          .format("YYYY-MM-DD"),
        EndDate: moment(selectedRows[0].toActiveDateTime)
          .locale("en")
          .format("YYYY-MM-DD"),
        startHour: selectedRows[0].fromActiveDateTime
          .split("T")[1]
          .split(":")[0],
        startMinute: selectedRows[0].fromActiveDateTime
          .split("T")[1]
          .split(":")[1],
        endHour: selectedRows[0].toActiveDateTime.split("T")[1].split(":")[0],
        endMinute: selectedRows[0].toActiveDateTime.split("T")[1].split(":")[0],
      });
      setModal(true);
    } else {
      throwToast({ type: "warning", value: "لطفا یک گزینه را انتخاب کنید" });
    }
  };

  const updateHandler = async (e: any) => {
    setLoading(true);
    await mutate({
      instrumentId: query?.instrumentId,
      maxQuantity: query?.maxQuantity,
      minPrice: query?.minPrice,
      maxPrice: query?.maxPrice,
      fromActiveDateTime:
        moment(query.StartDate).locale("en").format("YYYY-MM-DD") +
        `${query?.startHour ? "T" + query?.startHour + ":" : ""}` +
        `${query?.startMinute ? query?.startMinute + ":00" : ""}`,
      toActiveDateTime:
        moment(query.EndDate).locale("en").format("YYYY-MM-DD") +
        `${query?.endHour ? "T" + query?.endHour + ":" : ""}` +
        `${query?.endMinute ? query?.endMinute + ":00" : ""}`,
    })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
      })
      .catch((err) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  return (
    <>
      <Button
        label={"ویرایش"}
        className="bg-secondary"
        onClick={openUpdate}
        allowed={
          restriction ? [[service[0], modules[0][0], "Edit"].join(".")] : []
        }
      />
      <Modal
        title={"ایجاد تغییرات"}
        ModalWidth={"max-w-3xl"}
        open={modal}
        setOpen={setModal}
      >
        <form className={"grid grid-cols-2 gap-4"}>
          {toolbar.map((item: any) => {
            return (
              <InputComponent
                key={item.title}
                query={query}
                setQuery={setQuery}
                item={item}
                onChange={onChange}
              />
            );
          })}
        </form>
        <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
          <Button
            label={"لغو"}
            className="bg-error"
            onClick={(e) => {
              e.preventDefault();
              setModal(false);
            }}
          />
          <Button
            label={"تایید"}
            className="bg-primary"
            loading={loading}
            onClick={updateHandler}
          />
        </div>
      </Modal>
    </>
  );
}
