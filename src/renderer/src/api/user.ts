import http from "@utils/request";
// eslint-disable-next-line prettier/prettier
import { IUserData,IMenuData } from '@interface/user'

//获取个人信息
export const getInfo = ( ):Promise<IUserData>=>{
	return http.get<IUserData>('/personal/getInfo')
}

//获取路由
export const getUserMenu = (data:string):Promise<IMenuData>=>{
	return http.get<IUserData>(`/personal/getRouters/${data}`)
}