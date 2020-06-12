import axios from 'axios'

//设置服务器IP地址
axios.defaults.baseURL='http://localhost:5000'
// 登录
export const API_LOGIN=(account,password)=>axios.post('/users/checkLogin',{account,password})

// 添加账号

export const ADD_NUMBER=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})


//获取账号列表
export const ACCOUNT_LIST=(currentPage,pageSize)=>axios.get('/users/list',{ params:{currentPage,pageSize}})

//删除账号
export const DEL=(id)=>axios.get('/users/del',{params:{id}})

//批量删除 

export const DELALL=(ids)=>axios.get('/users/batchdel',{params:{ids}})


//修改账号


export const REVISE=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})

//检查旧密码是否正确

export const OLDPWD=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})

// 修改密码


export const EDITPWD=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id})


//获取账号个人中心

export const ADMIN=(id)=>axios.get('/users/accountinfo',{params:{id}})


// token

export const TOKEN=(token)=>axios.get('/users/checktoken',{params:{token}})


// 获取分类
export const CLASS=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})

// 添加分类

export const ADDCLASS=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})


//删除分类

export const DELCLASS=(id)=>axios.get('/goods/delcate',{params:{id}})


//修改分类

export const EDITCLASS=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})



//  查询所有分类名称


export const QUERYCLASS=()=>axios.get('/goods/categories',{params:{}})


//添加商品


export const ADDGOODS=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

//获取商品列表

export const GETGOODS=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})


//删除商品
export const DELGOODS=(id)=>axios.get('/goods/del',{params:{id}})


//编辑商品


export const EDITGOODS=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})


//获取订单列表

export const ORDERLIST=(currentPage,pageSize)=>axios.get('/order/list',{params:{currentPage,pageSize}})

//查询

export const QUERYLIST=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/list',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})


//修改订单


export const EDITORDER=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})


//首页报表接口


export const INDEX_echarts=()=>axios.get('/order/totaldata')



//订单报表接口
export const ORDER_echarts=(date)=>axios.get('/order/ordertotal',{params:{date}})

// 获取店铺详情

export const shop_info=()=>axios.get('/shop/info')


// 店铺内容修改

export const EDITSHOP=(id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,pics,date)=>axios.post('/shop/edit',{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,pics,date})





