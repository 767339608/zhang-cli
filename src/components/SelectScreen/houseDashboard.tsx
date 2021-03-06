import React, { Component, useEffect, memo, useState, useRef } from 'react';
import Item from './item';
import apis from '~/apis';
import { useHistory } from 'react-router';
import Modal from './modal';
import {CheckCircleOutlined} from '@ant-design/icons';
import {formatMoney} from '~utils/util';
import { message } from 'antd';

export default memo((props: any) => {
    const [list, setList] = useState(props.data || []);
    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [checkedRoom, setCheckedRoom] = useState<any>({});
    const [confirmData, setConfirmData] = useState<any>({});
    const [successVisible, setSuccessVisible] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState(false);
    const containerEl = useRef<any>();
    const h = useHistory();

    useEffect(() => {
        props.data && setList(props.data);
    }, [props.data]);

    useEffect(()=>{
        if(!confirmRequest) return;
        
        apis.getConfirmData({
            roomId: checkedRoom.id, 
            itemId: new URLSearchParams(h.location.search).get("itemId"),
            memberId: props.memberId
        }).then((res)=>{
            setConfirmRequest(false);
            setConfirmData(res.data);
            setConfirmVisible(true);
        }).catch((err)=>{
            err = JSON.parse(err);
            setConfirmVisible(false);
            setConfirmRequest(false);
            message.destroy();
            message.config({
                getContainer: ()=>containerEl.current
            });
            message.error(err.message)
        })
    }, [confirmRequest])

    const checkRoom = (room: any) => {
        setCheckedRoom(room);
        setVisible(true);
    }

    const cancel = () => {
        setVisible(false);
    }

    const ok = ()=>{
        setVisible(false);
        setConfirmRequest(true);
    }

    const cancelConfirm= ()=>{
        setConfirmVisible(false);
    }

    const closeModal = ()=>{
        setSuccessVisible(false);
    }

    const confirmHandle = ()=>{
        apis.purchase({
            roomId: checkedRoom.id, 
            itemId: new URLSearchParams(h.location.search).get("itemId"),
            memberId: props.memberId
        }).then((res)=>{
            setConfirmVisible(false);
            setSuccessVisible(true);
        }).catch((err)=>{
            err = JSON.parse(err);
            message.destroy();
            message.config({
                getContainer: ()=>containerEl.current
            });
            message.error(err.message)
        })
    }

    const controlMode = (data:[], mode:boolean)=>{
        if(!mode) return data.map((item:any)=>{
            return {
                blockName: item.saleControlTableHead.blockName,
                data: [item]
            }
        });

        const listObj:any = {};
        
        data.forEach((item:{floorList:[],saleControlTableHead:{blockName:string, unitName:string}}, index)=>{
            if(!listObj[item.saleControlTableHead.blockName]){
                listObj[item.saleControlTableHead.blockName] = {
                    blockName: item.saleControlTableHead.blockName,
                    data: []
                };
            }

            listObj[item.saleControlTableHead.blockName].data.push(item);
        });

        return Object.keys(listObj).map((key)=>{
            return listObj[key];
        })
    }


    return <div ref={el=>{containerEl.current=el}}>

        {
            controlMode(list, props.configData.mode).map((item: any, index) => {
                return <Item
                        key={item.blockName + '_' + index} 
                        data={item}
                        checkRoom={checkRoom}
                        configData={props.configData}
                    />
            })
        }
       
        
        <Modal
            title="????????????"
            visible={visible}
            onCancel={cancel}
            onOk={ok}
            showConfirmBtn={!!props.memberId}
        >
            <div style={{ lineHeight: 2, display: 'flex', flexWrap: 'wrap', color: '#575757', fontSize: 18 }}>
                <div style={{ width: '50%' }}>
                    ?????????{checkedRoom.fullRoomName}
                </div>
                <div style={{ width: '50%' }}>
                    ?????????{checkedRoom.builtArea} m??
                </div>
                <div style={{ width: '50%' }}>
                    ?????????{checkedRoom.roomLayout}
                </div>
                <div style={{ width: '50%' }}>
                    ?????????<span style={{ color: '#FF1A2E', fontWeight: 600 }}>{formatMoney(checkedRoom.depositAmount)}</span>
                </div>
                <div style={{ width: '50%' }}>
                    ?????????<span style={{ color: '#FF1A2E', fontWeight: 600 }}>{formatMoney(checkedRoom.totalPrice)}</span>
                </div>
            </div>
        </Modal>


        <Modal
            title="????????????"
            visible={confirmVisible}
            onCancel={cancelConfirm}
            showConfirmBtn={!!props.memberId}
            onOk={confirmHandle}
            okText="????????????"
        >
            <div style={{ lineHeight: 2, display: 'flex', flexWrap: 'wrap', color: '#575757', fontSize: 18 }}>
                <div style={{ width: '50%' }}>
                    ??????????????????{confirmData.memberName}
                </div>
                <div style={{ width: '100%' }}>
                    ???????????????{confirmData.memberIdcard}
                </div>
                {
                    (confirmData.coList || []).map((item:any)=>{
                        return (
                            <>
                                <div style={{ width: '50%' }}>
                                    ????????????????????????{item.coMemberName}
                                </div>
                                <div style={{ width: '50%' }}>
                                    ???????????????{item.coMemberIdcard}
                                </div>
                            </>
                        )
                    })
                }
                <div style={{ marginTop: 20, lineHeight: 2, display: 'flex', width:'100%', flexWrap: 'wrap', color: '#575757' }}>
                    <div style={{ width: '50%' }}>
                        ?????????{confirmData.fullRoomName}
                    </div>
                    <div style={{ width: '50%' }}>
                        ?????????{confirmData.builtArea} m??
                    </div>
                    <div style={{ width: '50%' }}>
                        ?????????<span style={{ color: '#FF1A2E', fontWeight: 600 }}>{formatMoney(confirmData.depositAmount)}</span>
                    </div>
                    <div style={{ width: '50%' }}>
                        ?????????{confirmData.roomLayout}
                    </div>
                    <div style={{ width: '50%' }}>
                        ?????????<span style={{ color: '#FF1A2E', fontWeight: 600 }}>{formatMoney(confirmData.totalPrice)}</span>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal
            title="????????????"
            visible={successVisible}
            onCancel={closeModal}
            showConfirmBtn={false}
            cancelText="??????"
        >
            <div style={{textAlign:'center'}}>
                <CheckCircleOutlined style={{color:'red', fontSize: 80}}/>
                <div style={{marginTop: 10, fontSize:20, fontWeight: 600}}>???????????????????????????</div>
            </div>
        </Modal>
    </div>
})