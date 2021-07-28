import React,{useEffect, useState} from 'react';
import { useSelector} from 'react-redux';

interface PermissionProps{
    name:string
    children:JSX.Element
}
function Permission(props:PermissionProps){
    const [visible, setVisible] = useState(false);
    const permissions:any[] = useSelector((state:any) => state.common.permissions)
    useEffect(()=>{
        for(let  i in permissions ){
            if(permissions[i].key==props.name){
                setVisible(true)
            }
        }
        return 
    }, [permissions])

    return visible ? props.children : null
}
export default Permission