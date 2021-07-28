import React from 'react'
import {
  AppstoreOutlined,
  BankOutlined,
  DatabaseOutlined,
  TeamOutlined,
  SettingOutlined,
  LeftOutlined,
  BarChartOutlined,
  FundProjectionScreenOutlined,
  WalletOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';

const back = () => (
  <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1135" width="18" height="18"><path d="M180.864 277.5808c-16.25088 12.288-16.25088 36.7104 0 48.9984L321.9456 433.31072c20.23424 15.3088 49.2544 0.87552 49.2544-24.4992V343.04h201.77408c118.48192 0 214.53312 89.3952 214.53312 199.68 0 110.27968-96.0512 199.68-214.53312 199.68H240.64a30.72 30.72 0 0 0-30.72 30.72v20.48a30.72 30.72 0 0 0 30.72 30.72h332.33408C740.06528 824.32 875.52 698.24512 875.52 542.72s-135.45472-281.6-302.54592-281.6H371.2V195.34848c0-25.37472-29.02016-39.808-49.2544-24.4992L180.864 277.5808z" fill="#FFFFFF" p-id="1136"></path></svg>
);

const appstoreOutlined = <AppstoreOutlined />
const bankOutlined = <BankOutlined />
const databaseOutlined = <DatabaseOutlined />
const teamOutlined = <TeamOutlined />
const settingOutlined = <SettingOutlined />
const leftOutlined = <LeftOutlined />
const barChartOutlined = <BarChartOutlined />
const fundProjectionScreenOutlined = <FundProjectionScreenOutlined />
const walletOutlined = <WalletOutlined />
const toolOutlined = <ToolOutlined />
const backIcon = <Icon component={back} />
export {
  appstoreOutlined,
  bankOutlined,
  databaseOutlined,
  teamOutlined,
  settingOutlined,
  leftOutlined,
  barChartOutlined,
  fundProjectionScreenOutlined,
  walletOutlined,
  toolOutlined,
  backIcon,
}