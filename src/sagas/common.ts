import { call, put, takeEvery, takeLatest, all, fork } from 'redux-saga/effects';
import AxiosRequest from '~utils/request';
import {
  SAVE_LOGIN_INFO,
  FETCH_REFRESH_TOKEN,
  ALL_PROV_AND_ZJ_SORT1,
  UPDATA_STATE,
  GET_BY_PCCODE,
  GET_QINIUTOKEN
} from '~reducers/common';

const post = new AxiosRequest().post;



//刷新token接口
function* refreshToken() {
  yield takeEvery(FETCH_REFRESH_TOKEN, function* ({ payload, resolve, reject }: any) {
    try {
      const response: GobalsResponse = yield call(post, '/mgt/user/refresh-token', payload);
      yield put({ type: SAVE_LOGIN_INFO, data: response.data });
      resolve && resolve(response.data);
    } catch (error) {
      reject && reject(error)
    }
  })
}

//获取所有省[浙江排在第一位]
function* allProvAndZjSort1() {
  yield takeEvery(ALL_PROV_AND_ZJ_SORT1, function* ({ payload, resolve, reject }: any) {
    try {
      const response: GobalsResponse = yield call(post, '/api/area/allProvAndZjSort1', payload);
      console.log(response)
      yield put({ type: UPDATA_STATE, data: { provList: response.data.list } });
      resolve && resolve(response.data);
    } catch (error) {
      reject && reject(error)
    }
  })
}
//根据父编码查询
function* getByPCode() {
  yield takeEvery(GET_BY_PCCODE, function* ({ payload, resolve, reject }: any) {
    try {
      const response: GobalsResponse = yield call(post, '/api/area/getByPCode', payload);
      resolve && resolve(response.data);
    } catch (error) {
      reject && reject(error)
    }
  })
}
//获取七牛token
function* getQiniuUploadToken() {
  yield takeEvery(GET_QINIUTOKEN, function* ({ payload, resolve, reject }: any) {
    try {
      const response: GobalsResponse = yield call(post, '/api/common/qiniu_token', payload);
      resolve && resolve(response.data);
    } catch (error) {
      reject && reject(error)
    }
  })
}
export default function* commonFLow() {
  yield all([
    fork(refreshToken),
    fork(allProvAndZjSort1),
    fork(getQiniuUploadToken),
    fork(getByPCode),
  ])
}
