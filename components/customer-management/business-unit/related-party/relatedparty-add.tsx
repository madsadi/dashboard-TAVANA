import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import InputComponent from "components/common/components/input-generator";
import Modal from "components/common/layout/modal";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { CustomerManagementBusinessUnitDetail } from "pages/customer-management/business-unit/detail";
import React, { useEffect, useState, useContext } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";

export const RelatedPartyAdd = () => {
  const [query, setQuery] = useState<any>({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { fetchData, selected, businessUnitId } = useContext<any>(
    CustomerManagementBusinessUnitDetail
  );
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnitRelatedParty/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      setModal(false);
    },
    setLoading: setLoading,
  });
  const {
    toolbar: initialToolbar,
    restriction,
    service,
    modules,
  } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_detail,
    "addRelatedParty"
  );

  useEffect(() => {
    if (modal && initialToolbar && initialToolbar.length) {
      setQuery({ isForAllPartyId: false });
    }
  }, [modal, initialToolbar]);

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  const businessEntityOptions = [
    {
      title: "relatedPartyId",
      name: "شرکت زیرمجموعه",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/subsidiary/Search`,
      valueField: ["title", "subsidiaryTypeTitle"],
      queryField: "Title",
      recordField: "id",
    },
    {
      title: "relatedPartyId",
      name: "شعبه",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/branch/Search?IsActive=true&IsDeleted=false`,
      valueField: ["subsidiaryTitle", "typeTitle", "tbsTitle", "title"],
      queryField: "Title",
      recordField: "id",
    },
    {
      title: "relatedPartyId",
      name: "بازاریاب",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/marketer/Search?IsActive=true&IsDeleted=false`,
      valueField: [
        "typeTitle",
        "title",
        "tbsMarketerName",
        "tbsReagentName",
        "branchTitle",
        "subsidiaryTitle",
      ],
      queryField: "TbsName",
      recordField: "id",
    },
    {
      title: "relatedPartyId",
      name: "ایستگاه معاملاتی",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/station/Search`,
      valueField: ["title", "branchTitle"],
      queryField: "Title",
      recordField: "id",
    },
    {
      title: "relatedPartyId",
      name: "کارمند",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/employee/Search`,
      valueField: [
        "Unique",
        "Title",
        "branchTitle",
        "departmentTitle",
        "positionTitle",
      ],
      queryField: "uniqueId",
      recordField: "id",
    },
    {
      title: "relatedPartyId",
      name: "مشتری",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/customer/Search`,
      valueField: ["title", "subsidiaryTypeTitle"],
      queryField: "Title",
      recordField: "id",
    },
    {
      title: "relatedPartyId",
      name: "واحد عملیاتی",
      type: "dynamicSearch",
      initialValue: "",
      endpoint: `${ADMIN_GATEWAY}/api/request/businessUnit/Search`,
      valueField: ["title"],
      queryField: "Title",
      recordField: "id",
    },
  ];

  function confirmHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    query: any
  ): void {
    e.preventDefault();
    add({
      businessUnitId: businessUnitId,
      ...query,
      relatedPartyId: query.isForAllPartyId ? null : query.relatedPartyId,
    });
  }

  const toolbar = query.relatedEntityCode
    ? [initialToolbar[0], businessEntityOptions[query.relatedEntityCode - 1]]
    : initialToolbar;
  return (
    <>
      <Button
        label={"جدید"}
        className="bg-primary"
        onClick={() => setModal(true)}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
            : []
        }
      />
      <Modal
        title={"دسترسی واحد کاری جدید"}
        ModalWidth={"max-w-3xl"}
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
                  item={
                    query.isForAllPartyId ? { ...item, readOnly: true } : item
                  }
                  setQuery={setQuery}
                  onChange={onChange}
                  dataHelper={selected?.[0]}
                />
              );
            })}
            <div className={"flex items-center"}>
              <input
                className={`checkbox`}
                checked={query.isForAllPartyId}
                onChange={(e) => onChange("isForAllPartyId", e.target.checked)}
                type="checkbox"
              />
              <label className="mr-2">دسترسی به تمامی ماهیت ایجاد شود؟</label>
            </div>
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
    </>
  );
};
