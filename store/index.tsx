import { configureStore } from '@reduxjs/toolkit'
import commissionConfig from './commissionConfig'
import marketRulesConfig from './marketRulesConfig'
import netFlowConfig from "./netFlowConfig";
import bookBuildingConfig from "./bookBuildingConfig";
import _ from 'lodash';

export const saveState = (state:object) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


const persistedState = loadState();
const store= configureStore({
    preloadedState: persistedState,
    reducer: {
        commissionConfig,
        netFlowConfig,
        bookBuildingConfig,
        marketRulesConfig
    },
    devTools: process.env.NODE_ENV==='development'
})

store.subscribe(_.throttle(() => {
    saveState({
    });
}, 100));

export default store