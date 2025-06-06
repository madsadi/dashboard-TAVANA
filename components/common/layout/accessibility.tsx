import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ChartPieIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Time from "../components/time";
import Router from "next/router";
import { useAuth } from "react-oidc-context";
import Link from "next/link";
import { IDP } from "../../../api/constants";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import jwt_decode from "jwt-decode";
import { user_permissions } from "../../../store/app.config";
import { clientId } from "pages/_app";
import { throwToast } from "../../../utils/notification";
import moment from "jalali-moment";

interface TokenType {
  permission: string[];
}

export const Accessibility = () => {
  const { data: info } = useSWR(
    {
      url: `${IDP}/api/users/GetCurrentUserInfo`,
      params: { cliendId: clientId },
    },
    { revalidateOnMount: true }
  );

  const auth = useAuth();
  const dispatch = useDispatch();
  const solutions = [
    {
      name: "پروفایل",
      description: `${info?.result?.firstName + " " + info?.result?.lastName}`,
      href: "/profile",
      icon: ChartPieIcon,
    },
  ];

  useEffect(() => {
    if (auth?.user?.access_token) {
      let token = auth?.user?.access_token;
      let decoded: TokenType = jwt_decode(token);

      if (typeof decoded?.permission == "string") {
        dispatch(user_permissions([decoded?.permission]));
      } else {
        dispatch(user_permissions(decoded?.permission || []));
      }
    }
  }, [auth?.user?.access_token]);

  useEffect(() => {
    if (
      info?.result?.isSimoultaneousLogin &&
      !localStorage.getItem("onlogin-simultaneously")
    ) {
      localStorage.setItem("onlogin-simultaneously", "isChecked");
      throwToast({ type: "warning", value: `${info.result.message}` });
    }
  }, [info]);

  const logout = () => {
    void auth.signoutRedirect({ id_token_hint: auth.user?.id_token });
    localStorage.removeItem("onlogin-simultaneously");
    dispatch(user_permissions([]));
    Router.push("/");
  };

  return (
    <>
      <Popover className={"lg:hidden mr-auto h-[34px]"}>
        <Popover.Button className="border border-border p-1 rounded">
          <UserCircleIcon className={"h-6 w-6"} />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div>
                {solutions.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <a
                        href={item.href}
                        className="font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <div className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                  <Time />
                </div>
                <button
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                  onClick={logout}
                >
                  خروج
                  <ArrowLeftOnRectangleIcon
                    className={"h-5 w-5 light:text-black mr-2"}
                  />
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="lg:flex hidden mr-auto light:text-black space-x-1 space-x-reverse divide-x-2 divide-x-reverse divide-slate-400/25">
        <Time />
        <div className="px-3" dir="rtl">
          {moment().locale("fa").format("dddd DD MMMM YYYY")}
        </div>
        <div>
          <Link
            className={"flex items-center px-3 cursor-pointer"}
            href={"/profile"}
          >
            {info?.result?.firstName + " " + info?.result?.lastName}
            <UserCircleIcon className={"h-5 w-5 mr-2"} />
          </Link>
        </div>
        <button className={"flex pr-2"} onClick={logout}>
          خروج
          <ArrowLeftOnRectangleIcon
            className={"h-5 w-5 light:text-black mr-2"}
          />
        </button>
      </div>
    </>
  );
};
