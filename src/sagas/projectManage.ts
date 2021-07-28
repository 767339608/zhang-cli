import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import AxiosRequest from "~utils/request";
import {
  REQUEST_TABLE_LIST,
  RECEIVE_TABLE_LIST,
  CREATE_PROJECT,
  GET_COMPANY_LIST,
  UPDATA_STATE,
  GET_ITEMS_LIST,
  RECEIVE_ITEMS_LIST,
  DEL_PROJECT,
} from "~reducers/projectManage";

import {
  GET_ROOM_TABLE_LIST,
  SAVE_ROOM_TABLE_LIST
} from "~reducers/rooms"

const post = new AxiosRequest().post;
//项目列表
function* getProjectList() {
  yield takeLatest(
    REQUEST_TABLE_LIST,
    function* ({ payload, resolve, reject }: any) {
      try {
        yield put({ type: RECEIVE_TABLE_LIST, data: { loading: true } });
        const response:ResponseData = yield call(post, "/mgt/item/list", payload);
        yield put({
          type: RECEIVE_TABLE_LIST,
          data: { ...response.data, loading: false },
        });
        resolve && resolve(response.data);
      } catch (error) {
        reject && reject(error);
      }
    }
  );
}


function* getRoom() {
  yield takeLatest(
    GET_ROOM_TABLE_LIST,
    function* ({ payload, resolve, reject }: any) {
      try {
        yield put({ type: SAVE_ROOM_TABLE_LIST, data: { loading: true } });
        const response:ResponseData = yield call(post, "/mgt/item/room/list", payload);
        yield put({
          type: SAVE_ROOM_TABLE_LIST,
          data: { ...response.data, loading: false },
        });
        resolve && resolve(response.data);
      } catch (error) {
        reject && reject(error);
      }
    }
  );
}


//新建项目
function* createProject() {
  yield takeLatest(CREATE_PROJECT, function* ({ payload, resolve, reject }: any) {
    try {
      const response:ResponseData = yield call(post, '/mgt/item/save', payload);
      resolve && resolve(response.data)
    } catch (error) {
      reject && reject(error)
    }
  })
}
//删除项目
function* DelProject() {
  yield takeLatest(DEL_PROJECT, function* ({ payload, resolve, reject }: any) {
    try {
      const response:ResponseData = yield call(post, '/mgt/item/del', payload);
      resolve && resolve(response.data)
    } catch (error) {
      reject && reject(error)
    }
  })
}
//开发商列表-已启用
function* getCompanyList() {
  yield takeLatest(GET_COMPANY_LIST, function* ({ payload, resolve, reject }: any) {
    try {
      const response:ResponseData = yield call(post, '/mgt/company/enable-list', payload);
      yield put({type:UPDATA_STATE,data:{comanyList:response.data.list}})
      resolve && resolve(response.data)
    } catch (error) {
      reject && reject(error)
    }
  })
}

//项目名称列表
function* getItemNameList(){
  yield takeLatest(GET_ITEMS_LIST, function* ({ payload, resolve, reject }: any) {
    try {
      const response:ResponseData = yield call(post, '/mgt/item/enable-list', payload);
      yield put({type:RECEIVE_ITEMS_LIST,data:{itemNames:response.data.list}})
      resolve && resolve(response.data)
    } catch (error) {
      reject && reject(error)
    }
  })
}

export default function* homePageCarousel() {
  yield all(
[
    fork(getProjectList),
    fork(createProject),
    fork(getCompanyList),
    fork(getItemNameList),
    fork(DelProject),
    fork(getCompanyList),
    fork(getRoom)
  ]);
}
