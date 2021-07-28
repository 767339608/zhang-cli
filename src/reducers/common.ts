import config from '../config.default'
export const SAVE_BREADCRUMB = Symbol('RECEIVE_BREADCRUMB');

export const SAVE_SIDEMENUDATA = 'SAVE_SIDEMENUDATA';

export const FETCH_CODEURL = Symbol('FETCH_CODEURL');
export const SAVE_CODEURL = 'RECEIVE_CODEURL';
export const SAVE_LOGIN_INFO = 'SAVE_LOGIN';

export const FETCH_LOGIN_INFO = Symbol('REQUEST_LOGIN');

export const SAVE_PERMISSIONS = 'SAVE_PERMISSIONS';

export const INIT_STATE = 'SAVE_NEWS_SOURCE_TAGS';

export const FETCH_REFRESH_TOKEN = Symbol('FETCH_REFRESH_TOKEN');

export const SAVE_LAST_FETCHED_TIME = Symbol('SAVE_LAST_FETCHED_TIME');

export const ALL_PROV_AND_ZJ_SORT1 = Symbol('ALL_PROV_AND_ZJ_SORT1');

export const UPDATA_STATE = 'UPDATA_STATE';

export const GET_BY_PCCODE = Symbol('GET_BY_PCCODE');

export const GET_QINIUTOKEN = Symbol('GET_QINIUTOKEN');

export const SAVE_CURRENT_ITEM_INFO = Symbol('SAVE_CURRENT_ITEM_INFO');

export const initState = {
  sideMenu: [],
  breadcrumb: [],
  permissions: [],
  provList: [],//省列表
  qiniuToken: {},
  infoProjectStatus: 0,//列表状态
  loginInfo: false,
  title: config.layout.defaultTitle,
  currentItem: {
    itemId: undefined,
    registerFlag: false,
    titleType: 0
  }
}

const common = (state = initState, action: Action) => {
  switch (action.type) {
    case SAVE_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.data || []
      }
    case SAVE_SIDEMENUDATA:
      return {
        ...state,
        sideMenu: action.data
      }
    case UPDATA_STATE:
      return {
        ...state,
        ...action.data
      }
    case SAVE_CODEURL:
      return {
        ...state,
        ...action.data
      }
    case SAVE_LOGIN_INFO:
      return {
        ...state,
        loginInfo: action.data
      }
    case SAVE_PERMISSIONS:
      return {
        ...state,
        permissions: action.data
      }
    case INIT_STATE:
      return {
        ...initState
      }
    case SAVE_LAST_FETCHED_TIME:
      return {
        ...state,
        lastFetchedTime: action.data
      }
    case SAVE_CURRENT_ITEM_INFO:
      return {
        ...state,
        currentItem: action.data
      }
    default:
      return state
  }
}

export default common
