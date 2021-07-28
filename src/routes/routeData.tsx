import React, { lazy } from 'react';
const Welcome = lazy(() => import('~pages/welcome'));
//获取route后缀文件
let configRoute: Array<routesConfigItem> = []
const files = require.context('./', false, /.route.tsx$/)
files.keys().map((key: any) => configRoute = [...configRoute, ...files(key).router])
import DefaultConfig from '../config.default'

export interface routesConfigItem {
  path?: string
  exact?: boolean
  strict?: boolean
  component?: React.ReactNode
  selected?: string
  children?: routesConfigItem[]
  redirect?: string
  from?: string
  to?: string
}

const routes: routesConfigItem[] = [
  ...configRoute,
  {
    from: "/",
    redirect: DefaultConfig.defaultPage,
    exact: true
  },
  {
    path: "/welcome",
    exact: true,
    component: Welcome,
    selected: 'home'
  },
];


export default routes