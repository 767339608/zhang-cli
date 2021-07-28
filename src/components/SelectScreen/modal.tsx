import React, { memo, useEffect, useRef, useState } from 'react';
import Style from './index.less';
import Permission from '~components/Permission';

export default memo((props: any) => {
    const ref = useRef<any>();
    const [visible, setVisible] = useState(props.visible);
    const [top, setTop] = useState<number | string>('50%');

    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                const height = window.document.body.offsetHeight;
                const domHeight = ref.current.offsetHeight as number;

                setTop((height - domHeight) / 2)
            }
        }, 0)

        setVisible(props.visible)

        if (!props.visible) {
            setTop('50%');
        }
    }, [props.visible])

    const onCancel = () => {
        props.onCancel && props.onCancel();
    }

    const onOk = () => {
        props.onOk && props.onOk();
    }

    return (
        visible ?
            <div ref={(el) => { ref.current = el }} style={{ position: 'fixed', width: 600, padding: 20, left: '50%', top: top, transform: `translateX(-250px)`, backgroundColor: '#ffffff', color: '#333', borderRadius: 4, transition: '.4s' }}>
                <div style={{ fontSize: 20, fontWeight: 500 }}>
                    {props.title}
                </div>
                <div style={{ padding: '15px 0' }}>
                    {props.children}
                </div>
                <div style={{ textAlign: "center" }}>
                    <button className={`${Style.modal_btn} ${Style.modal_btn_cancel}`}
                        onClick={onCancel}
                    >
                        {props.cancelText ? props.cancelText : '取消'}
                    </button>
                    {' '}
                    <Permission name="item-choose-purchase">
                    {
                        props.showConfirmBtn ? 
                        <button className={`${Style.modal_btn} ${Style.modal_btn_confirm}`}
                            onClick={onOk}
                        >
                            {props.okText ? props.okText : '认购'}
                        </button>
                        :
                        <></>
                    }
                    </Permission>
                </div>
            </div>
            :
            null
    )
})