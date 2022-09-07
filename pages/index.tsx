import type { NextPage } from 'next'
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import Router from "next/router";

const Home: NextPage = () => {

  const signIn=(e:any)=>{
    e.preventDefault()
    Router.push('/account')
  }
  return (
      <div className="flex align-items-center justify-content-center m-auto lg:w-3 md:w-8">
        <div className="p-4 border-round flex-grow-1">
          <div className="text-center mb-5">
            <img src="logo-2.png" alt="hyper" height={100} className="mb-3" />
          </div>

          <form onSubmit={signIn}>
            <label htmlFor="email" className="block text-900 font-medium mb-2">ایمیل</label>
            <InputText id="email" type="text" className="w-full mb-3" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">رمز عبور</label>
            <InputText id="password" type="password" className="w-full mb-3" />

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" />
                <label htmlFor="rememberme">مرا به خاطر بسپار</label>
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">رمز عبور را فراموش کردید؟</a>
            </div>

            <Button label="ورود" icon="pi pi-user" className="w-full" />
          </form>
        </div>
      </div>

  )
}

export default Home
