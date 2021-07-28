import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import SiderMenu from './SiderMenu/index';
import menuData from './SiderMenu/menuData';
import viceMenuData from './SiderMenu/vice-menuData';
import RoutesConfig from '~routes/index';
import SystemSetting from './SystemSetting';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import config from '../config.default'
import Style from './index.less';
import { SAVE_SIDEMENUDATA } from '~/reducers/common';
import { UPDATA_STATE, SAVE_CURRENT_ITEM_INFO } from '~/reducers/common';
import apiList from '~/apis';

const { Header, Content } = Layout;

function AppLayout(props: any) {
    const params = useParams<any>()
    const history = useHistory<any>()
    const [collapsed, setCollapsed] = useState(false)
    const [id, setId] = useState<any>()
    const { pathname } = useLocation();

    const dispatch = useDispatch()
    function toggle() {
        setCollapsed(!collapsed);
    }

    const setTitle = (title: string) => {
        dispatch({ type: UPDATA_STATE, data: { title } })
    }


    useEffect(() => {
        const s = decodeURIComponent(history.location.search);
        const id = new URLSearchParams(s).get("itemId");
        setId(id)
        if (!id) {
            props.dispatch({ type: SAVE_SIDEMENUDATA, data: menuData });
            props.dispatch({ type: SAVE_CURRENT_ITEM_INFO, data: {} })
            setTitle(config.layout.defaultTitle)
        } else {
            if (id === props.itemId) return;

            apiList.itemDetail({ id }).then((res) => {
                const { registerFlag, lotteryFlag, itemName, titleType } = res.data
                props.dispatch({ type: SAVE_CURRENT_ITEM_INFO, data: { itemId: id, itemName, lotteryFlag, registerFlag, titleType } })
                if (itemName && id) {
                    props.dispatch({ type: SAVE_SIDEMENUDATA, data: viceMenuData });
                    setTitle(itemName)
                }


            })
        }

    }, [pathname])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 侧边栏菜单 */}
            <SiderMenu collapsed={collapsed} />
            <Layout className={Style['site-layout']}>
                <Header className={Style['site-layout-background']} style={{ padding: 0, display: 'flex', alignItems: 'center', paddingRight: 16 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: Style.trigger,
                        onClick: toggle,
                    })}
                    <div style={{ flex: 1, fontSize: 20 }}>{id ? props.title : null}</div>
                    {/* 用户退出系统，修改密码设置 */}
                    <SystemSetting />
                </Header>
                <div style={{ padding: 16, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                    {/* 面包屑导航 */}
                    <Breadcrumb>
                        {
                            props.breadcrumb.map((item: string | { path: string, name: string }) => {
                                return (
                                    <Breadcrumb.Item key={typeof item === 'string' ? item : item.name}>
                                        {typeof item === 'string' ? item : <Link to={item.path}>{item.name}</Link>}
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>

                    {/* <RollbackOutlined style={{fontSize: 22}} onClick={()=>{console.log(props.history);props.history.go(-1)}} /> */}
                </div>
                <Content
                    className={Style['site-layout-background']}
                    style={{
                        margin: '0 16px 24px 16px',
                        padding: 32,
                        minHeight: 280,
                    }}
                >
                    <RoutesConfig />
                </Content>
            </Layout>
        </Layout>

    )

}

export default connect((state: any) => {
    const { breadcrumb, infoProjectStatus, title } = state.common;
    return {
        infoProjectStatus,
        breadcrumb,
        itemId: state.common.currentItem.itemId,
        title
    }
})(AppLayout)



