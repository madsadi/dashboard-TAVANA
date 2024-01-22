import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState, useEffect } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementBusinessUnitDetail } from "pages/holding-management/business-unit/detail";
import LabelValue from "components/common/components/label-value";
import useQuery from "hooks/useQuery";
import { useRouter } from "next/router";
import { CustomerManagementMarketerDetail } from "pages/holding-management/marketer/detail";

const DetailToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: marketerInfo, fetchData: searchMarketer } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/marketer/Search`,
  });
  const { mutate: remove } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnitOwnerParty/Delete`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketerSubordinate/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: edit } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketerSubordinate/Edit`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });

  const { fetchData, selected } = useContext<any>(
    CustomerManagementMarketerDetail
  );

  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_detail
  );
  const deleteRef: any = useRef();
  const addRef: any = useRef();
  const editRef: any = useRef();

  const modalHandler = (target: any) => {
    if (selected[0]) {
      target.current?.modalHandler(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  const router = useRouter();
  const marketerId = router.query.marketerId;
  useEffect(() => {
    if (marketerId) searchMarketer({ id: marketerId });
  }, [marketerId]);

  return (
    <>
      <div className="border border-border rounded-t-lg px-5 py-2 flex items-center flex-wrap space-x-10 space-x-reverse">
        <LabelValue
          title="مارکتر"
          value={marketerInfo?.result?.pagedData[0].title}
        />
        <LabelValue
          title="کدملی بازاریاب"
          value={marketerInfo?.result?.pagedData[0].uniqueId}
        />
        <LabelValue
          title="کدبازاریابی"
          value={marketerInfo?.result?.pagedData[0].marketerRefCode}
        />
        <LabelValue
          title="نوع بازاریاب"
          value={marketerInfo?.result?.pagedData[0].typeTitle}
        />
        <LabelValue
          title="عنوان شعبه بازاریاب"
          value={marketerInfo?.result?.pagedData[0].branchTitle}
        />
        <LabelValue
          title="عنوان شرکت"
          value={marketerInfo?.result?.pagedData[0].subsidiaryTitle}
        />
      </div>
      <div className={"toolbar items-center p-2 border-x border-border"}>
        <CRUDWrapper
          ref={addRef}
          title={`ایجاد بازاریاب فرعی`}
          confirmHandler={(e, query) => {
            e.preventDefault();
            add({ marketerId: marketerId, ...query });
          }}
          loading={loading}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_detail}
          selectedItem={selected?.[0]}
          subModule="modal"
        >
          <Button
            label={"جدید"}
            className="bg-primary"
            onClick={() => addRef.current?.modalHandler(true)}
            allowed={
              restriction
                ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
                : []
            }
          />
        </CRUDWrapper>
        <CRUDWrapper
          ref={editRef}
          title={`ویرایش  بازاریاب فرعی`}
          confirmHandler={(e, query) => {
            e.preventDefault();
            edit({ id: selected[0].id, marketerId: marketerId, ...query });
          }}
          loading={loading}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_detail}
          selectedItem={selected?.[0]}
          subModule="modal"
          mode="edit"
        >
          <Button
            label={"ویرایش"}
            className="bg-secondary"
            onClick={() => modalHandler(editRef)}
            allowed={
              restriction
                ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
                : []
            }
          />
        </CRUDWrapper>
        <CRUDWrapper
          ref={deleteRef}
          title={`حذف بازاریاب فرعی`}
          mode="delete"
          confirmHandler={(e) => {
            e.preventDefault();
            remove({ id: selected[0].id });
          }}
          modalMessage="حذف بازاریاب فرعی"
          entity="title"
          loading={loading}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_detail}
          selectedItem={selected?.[0]}
        >
          <Button
            label={"حذف"}
            className="bg-red-500"
            onClick={() => modalHandler(deleteRef)}
            allowed={
              restriction
                ? [[service?.[0], modules?.[0]?.[0], "Delete"].join(".")]
                : []
            }
          />
        </CRUDWrapper>
      </div>
    </>
  );
};

export default DetailToolbar;
