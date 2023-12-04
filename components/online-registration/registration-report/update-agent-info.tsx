import InputComponent from "../../common/components/input-generator";
import Modal from "../../common/layout/modal";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { throwToast } from "../../../utils/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { OnlineRegDetailContext } from "../../../pages/online-registration/registration-report/[...detail]";
import { Button } from "../../common/components/button/button";
import { OnlineRegContext } from "pages/online-registration/registration-report";

export default function UpdateAgentInfo() {
  const { selectedRows, fetchData, searchQuery } =
    useContext<any>(OnlineRegContext);
  const { fetchData: detailFetch, data } = useContext<any>(
    OnlineRegDetailContext
  );
  const { toolbar, modules, service, restriction } = useSearchFilters(
    ModuleIdentifier.ONLINE_REGISTRATION,
    "agentInfo"
  );
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/UpdateAgentInfo`,
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  let dep: string | undefined = router.query?.detail?.[0];
  const queryData: string[] | undefined = dep?.split("&");
  let userId = queryData?.[0]?.split("=")[1];
  let info: any =
    data?.metaData || selectedRows?.[0]?.metaData
      ? JSON.parse(data?.metaData || selectedRows?.[0]?.metaData)?.Agent
      : null;

  useEffect(() => {
    if (modal && info) {
      let _initialValue: any = {};
      toolbar.map((item: any) => {
        if (
          item.title === "SerialNumber" ||
          item.title === "SerialLetter" ||
          item.title === "SerialSeri" ||
          item.title === "IsReplica"
        ) {
          _initialValue[`${item.title}`] =
            info.BirthCertificateSerial[`${item.title}`];
        } else {
          _initialValue[`${item.title}`] = info[`${item.title}`];
        }
      });
      setQuery(_initialValue);
    } else {
      setQuery({});
    }
  }, [modal]);

  const openHandler = () => {
    if (selectedRows?.length === 1 || userId) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  const submitHandler = async (e: any) => {
    const { SerialNumber, IsReplica, SerialSeri, SerialLetter, ...rest } =
      query;
    const _query = {
      ...rest,
      birthCertificateSerial: {
        SerialNumber,
        IsReplica,
        SerialSeri,
        SerialLetter,
      },
    };
    e.preventDefault();
    setLoading(true);
    await mutate({ ..._query, userId: selectedRows?.[0]?.userId || userId })
      .then((res) => {
        throwToast({ type: "success", value: `${res?.data?.result?.message}` });
        setModal(false);
        setQuery(null);
        if (router.pathname === "/online-registration/registration-report") {
          fetchData(searchQuery);
        } else {
          detailFetch({ UserId: userId });
        }
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
        label={"ویرایش وکیل/نماینده"}
        className="bg-secondary "
        onClick={openHandler}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal title={"ویرایش وکیل/نماینده"} setOpen={setModal} open={modal}>
        <div className="field mt-4">
          <form onSubmit={submitHandler}>
            <div className={"grid grid-cols-2 gap-4"}>
              {toolbar.map((item: any) => {
                return (
                  <InputComponent
                    key={item.title}
                    query={query}
                    item={item}
                    onChange={onChange}
                  />
                );
              })}
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
}
