import {getGlobalTableState} from '~utils/util'
/*** @export  项目列表*/
export const REQUEST_TABLE_LIST = Symbol('REQUEST_TABLE_LIST');
export const RECEIVE_TABLE_LIST = Symbol('RECEIVE_TABLE_LIST');
/*** @export  新建项目*/
export const CREATE_PROJECT = Symbol('CREATE_PROJECT');
/*** @export  获取开发商列表*/
export const GET_COMPANY_LIST = Symbol('GET_COMPANY_LIST');
/*** @export  更新state*/
export const UPDATA_STATE = Symbol('UPDATA_STATE');

export const GET_ITEMS_LIST = Symbol('GET_ITEMS_LIST');
export const RECEIVE_ITEMS_LIST = Symbol('RECEIVE_ITEMS_LIST');


/*** @export  删除项目*/
export const DEL_PROJECT = Symbol('DEL_PROJECT');
const initState = {
    ...getGlobalTableState,
    houseNo:'',
    buildList:[],
    comanyList:[{}],
    houseNoArray:[],
    itemNames: []
  }
  const projectManage = (state = initState, action:Action) => {
    switch (action.type) {
        case RECEIVE_TABLE_LIST:
            return {
            ...state,
            ...action.data
        }
        case UPDATA_STATE:
          return {
            ...state,
            ...action.data
        }
        case RECEIVE_ITEMS_LIST:
          return {
            ...state,
            ...action.data
          }
        default:
          return state
    }
  }
  
  export default projectManage