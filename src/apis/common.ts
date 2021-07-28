/***@exports 验证码 */
export const getCodeUrl = '/mgt/user/graph-validate-code'
/***@exports 退出 */
export const getlogout = '/mgt/user/logout'
/***@exports 登陆 */
export const getLoginInfo = '/mgt/user/login'
/***@exports 修改密码 */
export const updatePassword = '/mgt/user/pwd/update'
/***@exports 获取权限 */
export const getPermissions = '/mgt/user/permissions'
/***@exports 刷新token接口 */
export const refreshToken = '/mgt/user/refresh-token'
/***@exports 获取七牛token */
export const getQiniuUploadToken = '/api/common/qiniu_token'
/***@exports 获取所有省[浙江排在第一位] */
export const allProvAndZjSort1 = '/api/area/allProvAndZjSort1'
/***@exports 根据父编码查询 */
export const getByPCode = '/api/area/getByPCode'
/***@exports 地区全数据Tree */
export const getAreaTree = '/api/area/getAreaTree'
/***@exports 扫证/输入证件号-获取客户信息 */
export const getByScanOrInput = '/api/common/getByScanOrInput';

export const getBlockList = '/mgt/item/room/block-list';
export const getUnitList = '/mgt/item/room/blockUnit-list';
export const getFloorList = '/mgt/item/room/blockUnitFloor-list';