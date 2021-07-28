import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory} from 'history';
import createRootReducer from '~reducers/index';
import logger from 'redux-logger';
import rootSaga from '~sagas/index';

export const history = createHashHistory();
 // 引入工具插件
 const { composeWithDevTools } = require('redux-devtools-extension');
const sagaMiddleware = createSagaMiddleware();

const middleWare: any[] = [
  routerMiddleware(history),
  sagaMiddleware
]

//开发环境下启用日志输出redux state
// if (process.env.NODE_ENV === "development") {
//   middleWare.push(logger);
// }

export const store: any = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      ...middleWare
    ),
  ),
)

export default function getStore() {
  sagaMiddleware.run(rootSaga)
  return store
}