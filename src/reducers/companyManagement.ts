/*** @export  获取开发商列表*/
export const GET_COMPANY_LIST = Symbol('GET_COMPANY_LIST');
export const RECEIVE_TABLE_LIST = Symbol('RECEIVE_TABLE_LIST');
/*** @export  新增开发商*/
export const ADD_COMPANY = Symbol('ADD_COMPANY');
/*** @export  重置密码*/
export const RESET_PWD = Symbol('RESET_PWD');
/*** @export  删除开发商*/
export const DEL_COMPANY = Symbol('DEL_COMPANY');
/*** @export  编辑开发商*/
export const EDIT_COMPANY = Symbol('ADD_COMPANY');
/*** @export  开发商详情*/
export const DETAIL_COMPANY = Symbol('DETAIL_COMPANY');
/*** @export  启用/禁用*/
export const STATUS_UPDATE = Symbol('DETAIL_COMPANY');
/*** @export  弹框加载loading状态*/
export const UPDATA_MODAL_VISIBLE = Symbol('UPDATA_MODAL_VISIBLE')

/*** @exports  更新全局数据 */
export const UPDATA_STATE = 'UPDATA_STATE';
import { getGlobalTableState } from '~utils/util'
const initState = {
  ...getGlobalTableState,
  houseNo: '',
  buildList: [],
  provList: [],
  cityList: [],
  areaList: [],
  Visibleloading: false,
  houseNoArray: []
}
const projectManage = (state = initState, action: Action) => {
  switch (action.type) {
    case UPDATA_MODAL_VISIBLE:
      return {
        ...state,
        ...action.data
      }
    case UPDATA_STATE:
      return {
        ...state,
        ...action.payload
      }
    case RECEIVE_TABLE_LIST:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export default projectManage