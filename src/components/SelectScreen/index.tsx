import React,{Component, memo, useEffect, useRef, useState} from 'react';
import Style from './index.less';
const topBg = require('~assets/images/top_bg.png').default;
const mainBg = require('~assets/images/main_bg.png').default;
import HouseDashboard from './houseDashboard';
import apis from '~/apis';
import {useHistory} from 'react-router'
import {SettingOutlined} from '@ant-design/icons';
import {Modal, Form, Switch, ModalFuncProps, InputNumber, Row, Col} from 'antd';
import {formLayout} from '~utils/util'

const img_1 = require('../../assets/images/t_l.png').default;
const img_2 = require('../../assets/images/t_r.png').default;
const img_3 = require('../../assets/images/b_l.png').default;
const img_4 = require('../../assets/images/b_r.png').default;
const bg = require('../../assets/images/setPlayerBiggerContent.png').default;

const headerStyle  = {
    paddingTop: 82,
    paddingBottom: 50,
    width:'100%', 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'space-between',
    backgroundImage: `url(${topBg})`,
    backgroundSize:'100% auto',
    backgroundRepeat:'no-repeat',
}

export default memo((props:any)=>{
    const timer = useRef<any>();
    const h = useHistory();
    const [info, setInfo] = useState<any>({});
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [config, setConfig] = useState({});

    useEffect(()=>{
        const getData = ()=>{
            apis.getRoomsData({id: new URLSearchParams(h.location.search).get("itemId")}).then((res)=>{
                res.data.list.forEach((item:any)=>{
                    item.floorLis = item.floorList.reverse();
                });
                setInfo(res.data);
            })
        }

        getData();

        timer.current = setInterval(getData, 3000)

        return ()=>{
            clearInterval(timer.current)
        }
    }, [])

    const showSetting = ()=>{
        setVisibleModal(true);
    }

    const cancel= ()=>{
        setVisibleModal(false);
    }
    
    const getConfig = (values:any)=>{
        setConfig(values);
        setVisibleModal(false);
    }

    return (
        <div style={{
            display:'flex', 
            boxSizing:'border-box', 
            padding: 15, 
            paddingTop: 0, 
            flexDirection:'column', 
            backgroundColor:'#0A1034', 
            height:'100%',
            width:'100%', 
            alignItems:'center', 
            color:'#fff',
            backgroundImage:`url(${mainBg})`,
            backgroundSize:'auto, 100%',
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat'
        }}>
            <div style={headerStyle}>
                <div className={Style.name}>{info.itemName}</div>
                <div className={Style.labelStatus}>
                    <div></div>可选
                    <div></div>已选
                    <div></div>已售
                    <div></div>不可选
                </div>
                <div className={Style.subTitle}>开盘宝 | {props.title || "房源详情"} <SettingOutlined onClick={showSetting} style={{cursor:'pointer', color: '#fff'}} /></div>
            </div>
            <div className={Style.content}>
                <div style={{height:'100%', overflow:'auto'}}>
                    {props.children}
                </div>
                <div style={{overflow:'auto', flex: 1, position:'relative', zIndex:100}}>
                   <HouseDashboard 
                        data = {info.list}
                        memberId={props.memberId}
                        configData={config}
                   />
                </div>

                <img className={Style.d} src={img_1}/>
                <img className={Style.d} src={img_2}/>
                <img className={Style.d} src={img_3}/>
                <img className={Style.d} src={img_4}/>
            </div>
            <SettingModal 
                visible={visibleModal}
                getContainer={false}
                title="大屏配置"
                onCancel={cancel}
                onOk={getConfig}
            />
        </div>
    )
})



const SettingModal = (props:ModalFuncProps)=>{
    const [form] = Form.useForm();
    const h = useHistory();
    const [config, setConfig] = useState({
        'move': false,
        'mode': false,
        'title_size': 25,
        'room_size': 18,
        'title_line': 35,
        'room_line': 25,
        'padding': 5,
        'block_size': 28,
        'block_line': 35,
        'scale': 1,
        'builtArea': false,
        'totalPrice': false,
        'price_size': 12,
        'area_size': 12
    });

    useEffect(()=>{
        let storageConfig:any = localStorage.getItem(`__name_${new URLSearchParams(h.location.search).get("itemId")}__`) || "";
        
        if(storageConfig){
            storageConfig = JSON.parse(storageConfig);
            setConfig({...config, ...storageConfig});
        }

        props.onOk && props.onOk(storageConfig || config);
    }, [])

    const onCancel = ()=>{
        props.onCancel && props.onCancel();
    }


    const onOk = ()=>{
        form.validateFields().then((values)=>{
            props.onOk && props.onOk(values);
            setConfig(values);
            localStorage.setItem(`__name_${new URLSearchParams(h.location.search).get("itemId")}__`, JSON.stringify(values))
        })
    }
    return (
        <Modal
            {...props}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form form={form} labelCol={{xs:{span: 12},sm:{span:12}}} wrapperCol={{xs:{span: 12}, sm:{span: 12}}}>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="是否可移动" name="move" initialValue={config['move']} valuePropName="checked">
                            <Switch/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="启用分组模式" name="mode" initialValue={config['mode']} valuePropName="checked">
                            <Switch/>
                        </Form.Item>
                    </Col>
                </Row>
                
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="是否展示建筑面积" name="builtArea" initialValue={config['builtArea']} valuePropName="checked">
                            <Switch/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="是否展示住房总价" name="totalPrice" initialValue={config['totalPrice']} valuePropName="checked">
                            <Switch/>
                        </Form.Item>
                    </Col>
                </Row>
                

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="单元字号" name="title_size" initialValue={config['title_size']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="房号字号" name="room_size" initialValue={config['room_size']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="单元行高" name="title_line" initialValue={config['title_line']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="房源行高" name="room_line" initialValue={config['room_line']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="缩放比例" name="scale" initialValue={config['scale']}>
                            <InputNumber min={0} max={10} step={0.01}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="房源左右间距" name="padding" initialValue={config['padding']}>
                            <InputNumber min={0}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="总价字号" name="price_size" initialValue={config['price_size']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="面积字号" name="area_size" initialValue={config['area_size']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                </Row>

                <hr />
                <h3>分组模式下生效</h3>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="楼栋标题字号" name="block_size" initialValue={config['block_size']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="楼栋标题行高" name="block_line" initialValue={config['block_line']}>
                            <InputNumber min={10}/>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Modal>
    )
}