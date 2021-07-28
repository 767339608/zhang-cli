import { push as _push } from 'connected-react-router';
import { store } from "../store";
import { message } from 'antd';
import printJs from 'print-js'
import apiList from '~/apis';
export const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

export function formatMoney(text: number) {
  if (!text && text != 0) {
    return "-";
  } else {
    return "￥" + text.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function download(url: string, downloadName = "excel") {
  if (url && Object.prototype.toString.call(url) === "[object String]") {
    let a = document.createElement("a");
    a.href = encodeURI(url);
    a.download = downloadName;
    a.click();
  }
}

export function dispatchWithPromise(args: any) {
  return new Promise((resolve, reject) => {
    store.dispatch({ ...args, resolve, reject });
  });
}
export const tablePaginationConfig = {
  pageSizeOptions: ["10", "20", "30", "40", "50"],
  showTotal: (total: number, range: number[]) => {
    return `总共${total}条，当前第${range[0]}至${range[1]}条`;
  },
  showSizeChanger: true,
  showQuickJumper: true,
};
//乘法
export function accMul(arg1: number, arg2: number) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
export function htmlEncodeByRegExp(str: string) {
  var temp = "";
  if (str.length == 0) return "";
  temp = str.replace(/&/g, "&amp;");
  temp = temp.replace(/</g, "&lt;");
  temp = temp.replace(/>/g, "&gt;");
  temp = temp.replace(/\s/g, "%20");
  temp = temp.replace(/\'/g, "&#39;");
  temp = temp.replace(/\"/g, "&quot;");
  return temp;
}

export const getGlobalTableState = {
  loading: false,
  list: [],
  pageNum: 1,
  pageSize: 10,
  totalPage: 0,
  totalSize: 0,
};

export const uploadQiniuUrl: string = "https://upload.qiniup.com/";


export const push = (path: string) => {
  store.dispatch(_push(path));
}
//全屏
export function fullScreen() {
  let element: any = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

//页面自适应
export function setmultiple() {
  let innerWidth = window.innerWidth
  let innerHeight = window.innerHeight
  let radioWidth = innerWidth / 1920
  let radioHeight = innerHeight / 1080
  let multiple = radioHeight > radioWidth ? radioWidth : radioHeight
  document.body.style.setProperty('--multiple', String(multiple));
}

export const filterColumns = (data: [], key: string, type: 1 | 2 | 3) => {//type=1运营；type=2代理商；type=3开发商
  const state = store.getState();
  const userType = state.common.loginInfo.userType;
  if (type == userType) {
    return data.filter((item: any) => {
      return item.dataIndex != key
    })
  }

  return data;
}

//数组分裂
export const arrFlat = (arr: Array<any>, index: number) => {
  let newarr = []
  for (let i = 0; i < index; i++) {
    newarr[i] = arr
  }
  return newarr
}

export async function printHTML(itemId: string, id: string | undefined) {
  let res = await apiList.purchaseContent({ itemId, id })
  let data = res.data
  const style = `<style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}body{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style><link rel='stylesheet' type='text/css' href='https://saas-transfer-oss.oss-cn-hangzhou.aliyuncs.com/house/vendor/ueditor/themes/iframe.css'/>`
  const tableStyle = `<style id="table">.selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}</style>`
  const tableSort = `<style id="tablesort">table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(https://saas-transfer-oss.oss-cn-hangzhou.aliyuncs.com/house/vendor/ueditor/themes/default/images/sortable.png);}</style>`

  printJs({
    printable: tableSort + tableStyle + style + data,
    type: 'raw-html',
    headerStyle: 'font-size:6px;font-weight:600;text-align:center;padding:15px 0 10px 0;',//标题设置
    properties: [],//json数据元
    gridHeaderStyle: 'font-size:6px;font-weight:400;height:40px;line-height:40px;border: 1px solid #ccc;padding:3px 5px 3px 5px;text-align:center;',//json格式表头样式
    gridStyle: 'font-size:1px;font-weight:200;border: 1px solid #ccc;padding:3px 5px 3px 5px;text-align:center;',//json各式表哥央视
    scanStyles: false,//不适用默认样式
    repeatTableHeader: false,//打印json表头只显示在第一页
    style: '@page{size:auto;margin: 0cm 1cm 0cm 1cm;}',//去除页眉页脚
  })
}