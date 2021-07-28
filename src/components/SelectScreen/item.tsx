import React, { useState } from 'react';
import Style from './index.less';
import Drag from '~components/Drag';
import {formatMoney} from '~utils/util'

export default (props: any) => {
    const [isMove, setIsMove] = useState(false);
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    });

    const { blockName, data } = props.data as { blockName: string, data: [{saleControlTableHead: any, floorList: []}] };

    const checkRoom = (room: any) => {
        return () => {
            if (room.roomStatus != 0 || isMove) return;
            props.checkRoom && props.checkRoom(room);
        }
    }


    const handleDragMove = (e: any) => {
        if (!props.configData.move) return;
        setIsMove(true);
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        });

    };

    const handleEnd = () => {
        setTimeout(() => {
            setIsMove(false);
        }, 300);
    }

    const { room_size, title_size, room_line, title_line, padding, move, mode, block_size, block_line, scale, builtArea, totalPrice, price_size, area_size} = props.configData;

    return (
        <Drag
            onDragMove={handleDragMove}
            onPointerUp={handleEnd}
            className={Style.houseItem}
            style={{
                zIndex: isMove ? 1000 : 0,
                transform: `matrix(1, 0, 0, 1, ${translate.x}, ${translate.y}) scale(${scale})`,
                cursor: move ? 'move' : '',
                marginLeft: 10,
                marginRight: 10
            }}>
            <div className={isMove ? Style.line : null} style={{'--scale': scale} as any}>
                {
                    mode ? <div style={{ backgroundColor: '#429AF8', color: '#fff', fontSize: block_size, textAlign: 'center', lineHeight: block_line + 'px', borderBottom: `1px solid #333` }}>
                        {blockName}
                    </div> : null
                }
                <div style={{display:'flex', flexDirection:'row'}}>
                {
                    data.map(({ saleControlTableHead, floorList }) => {
                        return <div key={saleControlTableHead.blockName+'_'+saleControlTableHead.unitName}>
                            <div style={{ backgroundColor: '#429AF8', color: '#fff', fontSize: title_size, textAlign: 'center', lineHeight: title_line + 'px', border: '1px solid #0092E5' }}>
                                {mode ? '' :saleControlTableHead.blockName}{saleControlTableHead.unitName}
                            </div>
                            <table className={Style.table}>
                                <tbody>
                                    {
                                        floorList.map((item: any) => {
                                            return (
                                                <tr key={item.floorNum}>
                                                    {//builtArea, totalPrice, price_size, area_size
                                                        item.roomList.map((room: any) => {
                                                            return <td key={room.id}
                                                                style={{ lineHeight: room_line + 'px', paddingLeft: padding, paddingRight: padding }}
                                                                className={Style[`room_status_${room.roomStatus}`]}
                                                                onClick={checkRoom(room)}>
                                                                <div style={{fontSize: room_size}}>{room.roomName}</div>
                                                                {builtArea ? <div style={{fontSize: area_size}}>{room.builtArea}m²</div> : null}
                                                                {totalPrice? <div style={{fontSize: price_size}}>{(room.totalPrice/10000).toFixed(2)}万</div> : null}
                                                            </td>
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    })
                }
                </div>
            </div>
        </Drag>
    )
}