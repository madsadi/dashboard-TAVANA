import Layout from "../../components/common/Layout";
import React, {useState} from "react";
import BuyDeclaration from "../../components/newFlow/information/BuyDeclaration";
import SellDeclaration from "../../components/newFlow/information/SellDeclaration";
import RollingClearing from "../../components/newFlow/information/RollingClearing";
import ClearedTrade from "../../components/newFlow/information/ClearedTrade";
import ClearingDateRange from "../../components/newFlow/information/ClearingDateRange";
import Rules from "../../components/newFlow/information/Rules";
import Operation from "../../components/newFlow/information/Operation";

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