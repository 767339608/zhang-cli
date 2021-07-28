
const config = {
    //登录权限
    loginPermissions: {
        enable: true,// 开启
        //默认超时时间(秒)
        maxExpiresIn: 2 * 3600,
        whiteList: ['/mgt/gov/user/refresh-token']//白名单
    },
    //页面权限
    Permissions: {
        enable: true,
        whiteList: []//白名单
    },
    //接口相关
    request: {
        prefix: {
            test: 'https://test-xx.com',//测试前缀
            prod: 'https://xx.com'//正式前缀
        },//默认前缀
        suffix: "",//默认后缀
        //重复请求
        common: {
            enable: true,
            whiteList:
                ['/api/common/qiniu_token']//重复请求白名单
        }
    },
    //端口监听
    listen: {
        path: '',
        port: 3000,//默认端口
        host: '0.0.0.0', // 默认输入locahost 不建议设置 hostname y为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    },
    //默认页面相关
    layout: {
        defaultTitle: 'test管理平台',//默认标题支持传标签
        defaultTitleLogo: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
        <g id="组_1" data-name="组 1" transform="translate(-345 -137)">
            <rect id="矩形_1" data-name="矩形 1" width="48" height="48" rx="8" transform="translate(345 137)" fill="#2f75de" />
            <text id="开" transform="translate(352 173)" fill="#fff" font-size="34" font-family="PingFangSC-Regular, PingFang SC"><tspan x="0" y="0">开</tspan></text>
        </g>
    </svg>`//默认logo支持传标签
    },
    //默认页面
    defaultPage: '/test',
}
export default config