import {
  call,
  put,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import AxiosRequest from "~utils/request";
import {
  ADD_COMPANY,
  DEL_COMPANY,
  DETAIL_COMPANY,
  EDIT_COMPANY,
  GET_COMPANY_LIST,
  RECEIVE_TABLE_LIST,
  RESET_PWD,
  STATUS_UPDATE,
  UPDATA_MODAL_VISIBLE,
} from "~/reducers/companyManagement";
const post = new AxiosRequest().post;
//开发商列表
function* getCompanyList() {
  yield takeLatest(
    GET_COMPANY_LIST,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(post, "/mgt/company/list", payload);
        yield put({
          type: RECEIVE_TABLE_LIST,
          data: { ...response.data, loading: false },
        });
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
//新增开发商
function* addCompany() {
  yield takeLatest(
    ADD_COMPANY,
    function* ({ payload, resolve, reject }: any) {
      try {
        yield put({ type: UPDATA_MODAL_VISIBLE, payload: { Visibleloading: true } })
        const response: GobalsResponse = yield call(post, "/mgt/company/save", payload);
        yield put({ type: UPDATA_MODAL_VISIBLE, payload: { Visibleloading: false } })
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
//编辑开发商
function* edit_compeny() {
  yield takeLatest(
    EDIT_COMPANY,
    function* ({ payload, resolve, reject }: any) {
      try {
        yield put({ type: UPDATA_MODAL_VISIBLE, payload: { Visibleloading: true } })
        const response: GobalsResponse = yield call(post, "/mgt/company/update", payload);
        yield put({ type: UPDATA_MODAL_VISIBLE, payload: { Visibleloading: false } })
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
//开发商详情
function* Companydetail() {
  yield takeLatest(
    DETAIL_COMPANY,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(post, "/mgt/company/detail", payload);
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
//删除开发商
function* CompanyDel() {
  yield takeLatest(
    DEL_COMPANY,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(post, "/mgt/company/delete", payload);
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
//更新开发商
function* stateUpdate() {
  yield takeLatest(
    STATUS_UPDATE,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(post, "/mgt/company/status/update", payload);
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
//重置密码
function* resetPwd() {
  yield takeLatest(
    RESET_PWD,
    function* ({ payload, resolve, reject }: any) {
      try {
        const response: GobalsResponse = yield call(post, "/mgt/company/pwd/reset", payload);
        resolve && resolve(response.data);
      } catch {
      }
    }
  );
}
export default function* homePageCarousel() {
  yield all([
    fork(getCompanyList),
    fork(addCompany),
    fork(Companydetail),
    fork(CompanyDel),
    fork(resetPwd),
    fork(edit_compeny),
    fork(stateUpdate),
  ]);
}
