
/*** @exports  更新全局数据 */
export const UPDATA_STATE = 'UPDATA_STATE';
import { getGlobalTableState } from '~utils/util'
export const initState = {
    ...getGlobalTableState,
    provList: [],
    cityList: [],
    areaList: [],
    Visibleloading: false
}

const systemLog = (state = initState, action: Action) => {
    switch (action.type) {
        case UPDATA_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default systemLog