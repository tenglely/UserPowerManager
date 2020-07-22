<template>
     <el-aside width="200px">
         <el-row class="tac">
          <el-col :span="24">
            <h4>用户权限管理系统</h4>
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item index="1" v-on:click="toHello">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <el-submenu index="2" v-for="(item,akey) in second" :key="akey">
                  <template slot="title">
                    <i v-bind:class="item.menuPhoto"></i>
                    <span>{{item.menuName}}</span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="(val,key) in item.two">
                      <el-menu-item v-bind:index="val.id.toString()" :key="key"  v-on:click="toPage(val.menuUrl)">
                        <i v-bind:class="val.menuPhoto"></i>{{val.menuName}}
                      </el-menu-item>
                    </template>
                  </el-menu-item-group>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
</template>

<script>
export default {
    props:[
        'second',
    ],
    methods:{
        //跳转页面
        toPage(url){
          var that = this;
          console.log(url);
          that.$router.push(url);
        },
        //首页
        toHello(){
          var that = this;
          that.$router.push('/home/hello');
        },
    }
}
</script>