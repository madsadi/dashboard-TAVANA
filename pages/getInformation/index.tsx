import Layout from "../../components/common/Layout";
import React, {useState} from "react";
import BuyDeclaration from "../../components/information/BuyDeclaration";
import SellDeclaration from "../../components/information/SellDeclaration";
import RollingClearing from "../../components/information/RollingClearing";
import ClearedTrade from "../../components/information/ClearedTrade";
import ClearingDateRange from "../../components/information/ClearingDateRange";
import Rules from "../../components/information/Rules";
import Operation from "../../components/information/Operation";

export default function GetInformation() {

    return (
        <Layout>
            <div className={'grid'}>
                <div className={'col text-center'}>
                    <BuyDeclaration/>
                </div>
                <div className={'col text-center'}>
                    <SellDeclaration/>
                </div>
            </div>
            <div className={'grid'}>
                <div className={'col text-center'}>
                    <RollingClearing/>
                </div>
                <div className={'col text-center'}>
                    <ClearedTrade/>
                </div>
            </div>
            <div className={'grid'}>
                <div className={'col text-center'}>
                    <Rules/>
                </div>
                <div className={'col text-center'}>
                    <Operation/>
                </div>
            </div>
            <div className={'grid'}>
                <div className={'col text-center'}>
                    <ClearingDateRange/>
                </div>
            </div>
        </Layout>
    )
}