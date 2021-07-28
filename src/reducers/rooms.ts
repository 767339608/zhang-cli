import {getGlobalTableState} from '~utils/util'

export const SAVE_ROOM_TABLE_LIST = Symbol('SAVE_ROOM_TABLE_LIST');
export const GET_ROOM_TABLE_LIST = Symbol('GET_ROOM_TABLE_LIST');


const initState = {
    ...getGlobalTableState,
    houseNo:'',
    buildList:[],
    comanyList:[{}],
    houseNoArray:[],
    itemNames: []
  }
  const projectRoomManage = (state = initState, action:Action) => {
    switch (action.type) {
        case SAVE_ROOM_TABLE_LIST:
          return {
            ...state,
            ...action.data
          }
        default:
          return state
    }
  }
  
  export default projectRoomManage