import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { SAVE_CODEURL } from '~reducers/common';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import apiList from '~/apis';
interface VerificationCodeInputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    value?: string
    img?: string
    size: SizeType
    disabled?: boolean
    placeholder?: string
}
const VerificationCodeInput = ({ onChange, value, img, size, disabled, placeholder }: VerificationCodeInputProps): React.ReactElement => {
    const [codeUrl, setCodeUrl] = useState(img);
    const [codeVal, setCodeVal] = useState(value);
    const dispatch = useDispatch()
    function triggerChange(val: any) {
        onChange && onChange(val);
    }

    function changeHandle(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value || "";
        val = val.trim();
        setCodeVal(val);
        triggerChange(val || undefined);
    }
    async function getCodeUrl() {
        try {
            let res = await apiList.getCodeUrl()
            console.log(res)
            dispatch({ type: SAVE_CODEURL, data: res.data })
        } catch (e) {

        }
    }
    function refreshCodeHandle() {
        getCodeUrl()
        setCodeVal(undefined);
        triggerChange(undefined);
    }

    useEffect(() => {
        setCodeVal(undefined);
        codeUrl && triggerChange(undefined);
        setCodeUrl(img);
    }, [img]);

    useEffect(() => {
        setCodeVal(value);
    }, [value]);

    useEffect(() => {
        getCodeUrl()
        return
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Input
                value={codeVal}
                size={size}
                disabled={disabled}
                placeholder={placeholder}
                onChange={changeHandle}
                style={{ width: '60%' }}
            />
            <img src={`data:image/png;base64,${codeUrl}`} onClick={refreshCodeHandle} style={{ width: '35%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
        </div>
    )
}

export default connect((state: any) => ({ img: state.common.img, imgKey: state.common.imgKey }))(VerificationCodeInput)