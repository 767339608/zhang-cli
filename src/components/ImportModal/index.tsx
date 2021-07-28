import React,{useEffect, useState} from 'react';
import {Form, Upload, Modal, Button} from 'antd';
import {useHistory} from 'react-router';

export default (props:any)=>{
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();
    const h = useHistory();

    const onOk = () => {

            form.validateFields().then((values) => {

                Modal.confirm({
                    title:"温馨提示",
                    content:"数据将被全量覆盖，请谨慎操作",
                    onOk(){
                        setSubmitting(true)
                        const { excelFile } = values;
                        const file = excelFile[0];
            
                        const formData = new FormData();
                        formData.append("excelFile", file);
                        formData.append("itemId", new URLSearchParams(h.location.search).get("itemId") as string);
                        
                        if(props.onOk){
                            props.onOk(formData).then(()=>{
                                setSubmitting(false)
                            }).catch(()=>{
                                setSubmitting(false)
                            })
                        }
                            }
                        })
                
            }).catch(()=>{
                setSubmitting(false);
            })
            

    }

    useEffect(()=>{
        if(!props.visible){
            form.resetFields();
        }
    }, [props.visible])

    const getExcelTemplate = () => {
        props.getExcelTemplate && props.getExcelTemplate();
    }

    return (
        <Modal
            title="导入数据"
            {...props}
            onOk={onOk}
            destroyOnClose={true}
            confirmLoading={submitting}
        >
            <Form form={form}>

                <Form.Item
                    label="附件上传"
                    name="excelFile"
                    rules={[{required: true, message: "附件必传"}]}
                >   
                    <UploadFile />
                </Form.Item>

                <Form.Item
                    label="数据模板"
                >
                    <a onClick={getExcelTemplate}>下载数据模板</a>
                </Form.Item>
            </Form>
        </Modal>
    )
}


const UploadFile = (props:any)=>{
    const [fileList, setFileList] = useState([])

    useEffect(()=>{
        setFileList(props.value);
    }, [props.value]);
    

    const before = (file:any, fileList:any) => {
        console.log(file)
        fileList = [file];
        setFileList(fileList);
        props.onChange && props.onChange(fileList);
        return false;
    }

    const remove = ()=>{
        setFileList([]);
        props.onChange && props.onChange([]);
    }

    return (
        <Upload
            fileList={fileList}
            beforeUpload={before}
            onRemove={remove}
        >
            <Button>上传文件</Button>
        </Upload>
    )
}