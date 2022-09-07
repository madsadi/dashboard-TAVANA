import Layout from "../../components/common/Layout";
import React from "react";
import DateComponent from "../../components/information/DateComponent";

export default function GetInformation() {

    return (
        <Layout>
            <div className={'grid'}>
                <div className={'col text-center'}>
                    <DateComponent api={'/Trade/buy-declaration'}/>
                </div>
                <div className={'col text-center'}>
                    <DateComponent api={'/Trade/buy-declaration-count'}/>
                </div>
                <div className={'col text-center'}>
                    <DateComponent api={'/Trade/sell-declaration'}/>
                </div>
                <div className={'col text-center'}>
                    {/*<DateComponent api={}/>*/}
                </div>
                <div className={'col text-center'}>
                    {/*<DateComponent/>*/}
                </div>
            </div>
        </Layout>
    )
}