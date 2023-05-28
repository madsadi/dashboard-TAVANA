import React, {useState} from 'react';
import axios from 'axios';


const useMutation = ({url = '', method = 'post'}) => {

    const mutate = async (body: any = {},params={},headers={}) => {
        const purifyObject = (input:any)=>{
            let bodyToQuery: any = {};
            Object.keys(input).map((item: any) => {
                if (input[item] !== null && input[item] !== undefined && input[item] !== '') {
                    bodyToQuery[item] = input[item]
                }
            })
            return bodyToQuery
        }
        return axios({
            url: url,
            method: method,
            headers:headers,
            data: purifyObject(body),
            params:purifyObject(params)
        });
    };

    return {mutate};
};

export default useMutation;