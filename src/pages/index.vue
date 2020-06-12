<template>
  <div id="main">
    <div id="leftBox">
      <div>
        <span class="el-icon-dish"></span> 外卖商家中心
      </div>

      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        是否只保持一个子菜单的展开
        router  
      >
      
        <div v-for="item in  newtreeList" :key="item.index">
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.cla"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="child in item.children" :key="child.index">
              <el-menu-item :index="child.index">{{child.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item v-else :index="item.index">
            <i :class="item.cla"></i>

            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <!-- <el-menu-item index="/ch">
            <i class="el-icon-s-home"></i>

            <span slot="title">后台首页</span>
          </el-menu-item>

          <el-menu-item index="/order">
            <i class="el-icon-document"></i>

            <span slot="title">订单管理</span>
          </el-menu-item>

          <el-submenu index="pl">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/pl">商品列表</el-menu-item>
              <el-menu-item index="/pa">商品添加</el-menu-item>
              <el-menu-item index="/class">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/shop">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <el-submenu index="al">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/al">账号列表</el-menu-item>
              <el-menu-item index="/an">添加账号</el-menu-item>
              <el-menu-item index="/cp">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="/cs">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cs">商品统计</el-menu-item>
              <el-menu-item index="/os">订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </div>
      </el-menu>
    </div>

    <div id="rightBox">
      <div>
    
        <div>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="admin_name">
          <router-link to="/index/admin">
            <span>欢迎您&nbsp;{{acc}}</span>
           <img :src="img" alt="" width="30px">
          </router-link>
        </div>
      </div>

      <div id="entry">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import { ADMIN } from "@/api/apis";
//引入token
import { TOKEN } from "@/api/apis";
export default {
  data() {
    return {
      // treeList:左侧列表
      // index:跳转地址
      //cla: 图标
      //title：列表名称
      treeList: [
        { index: "/index/ch", cla: "el-icon-s-home", title: "后台首页",role:['super','normal'] },
        { index: "/index/order", cla: "el-icon-document", title: "订单管理",role:['super','normal']  },
        {
          index: "/index/pl",
          cla: "el-icon-goods",
          title: "商品管理",
          role:['super'] ,
          children: [
            { index: "/index/pl", title: "商品列表" },
            { index: "/index/pa", title: "商品添加" },
            { index: "/index/class", title: "商品分类" }
          ]
        },
        { index: "/index/shop", cla: "el-icon-s-shop", title: "店铺管理",role:['super','normal']  },
        {
          index: "/index/al",
          cla: "el-icon-user-solid",
          title: "账号管理",
          role:['super'] ,
          children: [
            { index: "/index/al", title: "账号列表" },
            { index: "/index/an", title: "添加账号" },
            { index: "/index/cp", title: "修改密码" }
          ]
        },

        {
          index: "/index/cs",
          cla: "el-icon-pie-chart",
          title: "销售统计",
          role:['super'] ,
          children: [
            { index: "/index/cs", title: "商品统计" },
            { index: "/index/os", title: "订单统计" }
          ]
        }
      ],
      // 列表激活效果
      // defaultActive:'/ch'

      // 面包屑
      breadlist: ["首页"],
      acc:'',
      img:'',
      admin:"",
      role:''
    };
  },

  methods: {
    //根据hash值变化，切换面包屑
    changeBreadlist(hash) {
      let arr = [];
      //根据hash值，改变面包屑数组
      switch (hash) {
        case "/index/ch":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/pl":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/pa":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/class":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/shop":
          arr = ["店铺管理"];
          break;

        case "/index/al":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/an":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/cp":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/cs":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/os":
          arr = ["销售统计", "订单统计"];
          break;
      }

      this.breadlist = arr;
    }
  },
  // 监听路由
  watch: {
    $route: {
      handler: val => {
        window._indexthis.changeBreadlist(val.path);
      },
      // 深监听
      deep: true
    }
  },
  created() {
  // 获取role
  this.role=localStorage.role
 
//  判断token是否失效

TOKEN(localStorage.token).then(res=>{
  // console.log(res.data.code);
  if(res.data.code==0){
  // 渲染用户民和头像
    let id = JSON.parse(localStorage.id);

    ADMIN(id).then(res => {
     
      this.acc = res.data.accountInfo.account;
    
      this.img = res.data.accountInfo.imgUrl;

      this.admin='/admin'
     });
  }
  else{
      this.acc = '请登录';
    
      this.img = '';

      this.admin='/'
  }
})

  
    
      
  








    // 获取当前的hash值
    let hash = this.$route.path;

    //根据hash值激活的样式
    this.defaultActive = hash;

    //改变面包屑数组 （刷新不改变）
    this.changeBreadlist(hash);

    //保存这个this因为再watch中获取不到this
    window._indexthis = this;
  },
// 计算属性
computed:{
            //  根据权限返回新的数组渲染左侧列表
              newtreeList(){
                  
          //     var newarr = this.treeList.filter(item=>{
          //             // 判断this.treeList的role属性是否存在super或normal 添加到新数组中
          //        return item.role.includes(this.role)
          //     })

          // return newarr

              return this.treeList.filter(item=>item.role.includes(this.role) )

              }
}

};
</script>  

<style>
#main {
  display: flex;
  width: 100%;
  height: 100%;
}
#leftBox {
  width: 250px;
  height: 100%;
  background: #545c64;
}
#leftBox > div {
  margin-left: 20px;
  color: white;
  margin-top: 10px;
}
#leftBox > div > .el-icon-dish {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  background: #1296db;
}
#leftBox .el-menu {
  border-right: 0;
}
#rightBox {
  padding-right: 20px;
  height: 100%;
  width: 100%;
}
#rightBox > div:nth-child(1) {
  margin-left: 20px;
  display: flex;
  height: 50px;
  margin-top: 15px;
  /* width: 100%; */
  justify-content: space-between;
}

#entry {
  width: 100%;
  height: 91%;
}

#admin_name{
  text-align: center;
  line-height: 20px;

}
#admin_name a{
  text-decoration: none;
  color: #000;
}
#admin_name img{
  vertical-align: middle;
}
</style>