import React, { useState } from "react";
import InputComponent from "../../common/components/input-generator";
import Modal from "../../common/layout/modal";
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { Button } from "../../common/components/button/button";

export const SendMessageComponent = () => {
  const [modal, setModal] = useState(false);
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.ONLINE_REGISTRATION
  );
  const [query, setQuery] = useState({ date: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchAsyncData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SendMessageToUncompletedUsers`,
  });

  const sendMessage = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await fetchAsyncData({
      registrationDateTime: query.date.split("T")[0] + "T23:59:00",
    })
      .then((res) =>
        throwToast({
          type: "success",
          value: ` برای ${res?.data?.result?.totalCount} نفر پیامک با موفقیت ارسال شد `,
        })
      )
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
        label={"ارسال پیام"}
        onClick={() => setModal(true)}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Read"].join(".")]
            : []
        }
      />
      <Modal title={"ارسال پیام"} setOpen={setModal} open={modal}>
        <p className="text-center font-bold">
          با انتخاب تاریخ و زدن گزینه تایید، برای تمام افراد ی که وضعیت ثبت نام
          آنها در آن تاریخ کامل نشده، پیامک پیگیری ارسال می شود.
        </p>
        <div className="field mt-4">
          <form onSubmit={sendMessage}>
            <div className={"w-full md:w-3/5"}>
              <InputComponent
                item={{ title: "date", type: "singleDate", name: "تاریخ" }}
                query={query}
                onChange={onChange}
              />
            </div>
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
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
