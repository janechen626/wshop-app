import {_webapp} from './webapp'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}
/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export  const GetQueryString=function(url,name){
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//        let r = window.location.search.substr(1).match(reg);
  let r = url.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}


/**
 *
 * app端的数据交互功能
 */

export const fn = {

}


