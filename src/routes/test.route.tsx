import React, { lazy } from 'react'
const test = lazy(() => import("~/pages/test/index"))
export const router = [
    {
        path: "/test",
        exact: true,
        component: test,
        selected: '测试'
    },
]