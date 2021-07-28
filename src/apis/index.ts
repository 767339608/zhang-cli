import React from 'react'

import AxiosRequest from "~utils/request";
const post = new AxiosRequest().post;
import { dispatchWithPromise } from '~utils/util';
const context = require.context('./', true, /(\.ts)$/);
const keys: [{}] = context.keys().filter((item: string) => (item !== './index.js' && item !== './index.ts'));
interface Module {
    [propName: string]: string,
}
interface apiListProps {
    [propName: string]: (params?: any, listType?: string, config?: any) => Promise<any>
}
let apiList: apiListProps = {};
for (let i = 0; i < keys.length; i += 1) {
    const apiObj: Module = context(keys[i])
    for (let i in apiObj) {
        let url = apiObj[i]
        apiList[i] = async function (params?: any, listType?: string, config?: any) {

            return new Promise((resolve, reject)=>{
                post(url, params, config).then((res)=>{
                    if (listType) {
                        dispatchWithPromise({
                            type: listType,
                            payload: { ...res.data, loading: false },
                        });
                    }
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                })
            })
        }
    }
}
export default apiList