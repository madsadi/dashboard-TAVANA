import React, { useState } from "react";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  QrCodeIcon,
  UserIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { jalali } from "../../utils/common-funcions";
import { EditInfoModal } from "./edit-info-modal";
import useMutation from "../../hooks/useMutation";
import { IDP } from "../../api/constants";
import { throwToast } from "../../utils/notification";
import { PasswordModal } from "./password-modal";
import { ChangeMobileNumber } from "./change-mobile-number";
import useSWR from "swr";
import { SwitchToggle } from "../common/components/button/switch-toggle";
import { Button } from "components/common/components/button/button";

export default function UserInfo() {
  const { data } = useSWR(
    { url: `${IDP}/api/users/GetCurrentUserInfo` },
    { revalidateOnMount: true }
  );
  const [open, setOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const fields: any = [
    {
      id: 0,
      title: "نام و نام خانوادگی:",
      icon: <UserIcon className={"h-4 min-w-4"} />,
      info: data?.result?.firstName + " " + data?.result?.lastName,
    },
    {
      id: 1,
      title: "نام کاربری:",
      icon: <FingerPrintIcon className={"h-4 min-w-4"} />,
      info: data?.result?.userName,
    },
    {
      id: 2,
      title: "ایمیل:",
      icon: <EnvelopeIcon className={"h-4 min-w-4"} />,
      info: data?.result?.email,
    },
    {
      id: 3,
      title: "تلفن همراه:",
      icon: <DevicePhoneMobileIcon className={"h-4 min-w-4"} />,
      info: data?.result?.phoneNumber,
      utility: <ChangeMobileNumber />,
    },
    {
      id: 4,
      title: "کدملی:",
      icon: <IdentificationIcon className={"h-4 min-w-4"} />,
      info: data?.result?.nationalId,
    },
    {
      id: 5,
      title: "تاریخ تولد:",
      icon: <CalendarDaysIcon className={"h-4 min-w-4"} />,
      info: data?.result?.birthdate
        ? jalali(data?.result?.birthdate).date
        : "-",
    },
    {
      id: 6,
      title: "ورود دو عاملی:",
      icon: <QrCodeIcon className={"h-4 min-w-4"} />,
      info: <ToggleButton />,
    },
  ];

  return (
    <div
      className={
        "lg:w-1/3 w-full border border-border rounded-lg overflow-hidden"
      }
    >
      <div>
        {fields.map((field: any) => {
          return (
            <div className={"flex even:bg-gray-200 p-2"} key={field.id}>
              <div className={"flex flex-1 px-2"}>
                <div className={"bg-gray-400 rounded-full p-1 ml-3 h-fit"}>
                  {field.icon}
                </div>
                <span className={"min-w-fit"}>{field.title}</span>
              </div>
              <div className={"min-w-fit flex items-center"}>
                {field?.utility ? field?.utility : null}
                <div>{data && field.info}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center px-4 py-2 space-x-4 space-x-reverse">
        <Button
          className={" bg-secondary"}
          label="ویرایش حساب کاربری"
          onClick={() => setOpen(true)}
        />
        <Button
          className={" bg-primary"}
          label="تغییر رمز عبور"
          onClick={() => setPasswordModal(true)}
        />
      </div>
      <PasswordModal setOpen={setPasswordModal} open={passwordModal} />
      <EditInfoModal setOpen={setOpen} open={open} />
    </div>
  );
}

const ToggleButton = () => {
  const { data } = useSWR(
    { url: `${IDP}/api/users/GetCurrentUserInfo` },
    { revalidateOnMount: true }
  );
  const { mutate } = useMutation({
    url: `${IDP}/api/account/2fa`,
    method: "PUT",
  });
  const [enabled, setEnabled] = useState(data?.result.twoFactorEnabled);

  const twoFactorHandler = async () => {
    await mutate({}, { enabled: !enabled })
      .then(() => setEnabled(!enabled))
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  return <SwitchToggle isChecked={enabled} onChange={twoFactorHandler} />;
};
