import { 
    leftOutlined,
    barChartOutlined,
    settingOutlined,
    fundProjectionScreenOutlined,
    walletOutlined,
    toolOutlined,
    backIcon
} from '../icon'
const menuData: SideMenuItemList = [
    {
        title: '返回项目列表',
        path: '/projectManagement',
        icon:backIcon,
        selected: '返回项目列表'
    },
    {
        title: '项目概览',
        path: '/overview',
        icon:barChartOutlined,
        selected: '项目概览',
        permission: "item-overview"
    },
    {
        title: '项目设置',
        selected: '项目设置',
        icon:toolOutlined,
        permission: 'item-setting',
        children: [
            {
                title: '房源管理',
                path: '/rooms',
                selected: '房源管理',
                permission: 'item-room-mgt'
            },
            {
                title: '客户管理',
                path: '/users',
                selected: '客户管理',
                permission: 'item-member-mgt'
            },
        ]
    },
    {
        title: '项目执行',
        selected: '项目执行',
        icon:walletOutlined,
        permission: 'item-processing',
        children: [
            {
                title: '签到管理',
                path: '/signIn',
                selected: '签到管理',
                permission: 'item-sign-mgt',
            },
            {
                title: '摇号管理',
                path: '/lottery',
                selected: '摇号管理',
                permission: 'item-lottery-mgt'
            },
            {
                title: '叫号管理',
                path: '/call',
                selected: '叫号管理',
                permission: 'item-call-mgt'
            },
            {
                title: '选房管理',
                path: '/itemScreen',
                selected: '选房管理',
                permission: 'item-choose-mgt'
            },
            {
                title: '核销管理',
                path: '/verification',
                selected: '核销管理',
                permission: 'item-choose-sign-mgt'
            }
        ]
    },
    {
        title: '项目大屏',
        selected: '项目大屏',
        icon:fundProjectionScreenOutlined,
        permission: 'item-screen',
        children: [
            {
                title: '签到大屏',
                path: '/signInScreen',
                selected: '签到大屏',
                target: '_blank',
                permission: 'item-sign-screen'
            },
            {
                title: '摇号大屏',
                path: '/LotteryScreen',
                selected: '摇号大屏',
                target: '_blank',
                permission: "item-lottery-screen"
            },
            {
                title: '叫号大屏',
                path: '/YourScreen',
                selected: '叫号大屏',
                target: '_blank',
                permission: "item-call-screen"

            },
            {
                title: '合同套打',
                path: '/SetPlayerBigger',
                selected: '合同套打',
                target: '_blank',
                permission: "item-print-screen"

            },
            {
                title: '销控大屏',
                selected: '销控大屏',
                path: '/verificationScreen',
                permission: 'item-xk-screen'
            },
        ]
    },
]

export default menuData;