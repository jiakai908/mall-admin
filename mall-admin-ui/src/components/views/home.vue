<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="/static/logo.png">
          </div>
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="loginout" @click.prevent="handleSignout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- default-active:默认展开项
          :unique-opened: 只允许同时展开一项
          :router 开启路由模式
          开启后, 设置el-menu-item的index值 为路由标识
        -->
        <el-menu class="menu" :unique-opened="true" :router="true">
          <el-submenu v-for="item in menus"
                      :key="item.id"
                      :index="''+item.id">

            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName}}</span>
            </template>

            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index='"/" + item1.path'>
              <i class="el-icon-menu"></i>
              {{ item1.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!--视图容器-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menus: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      handleSignout() {
        // 删除session中token
        sessionStorage.clear()
        // 跳转到登录页面
        this.$router.push({name: 'login'})
        // 提示退出成功
        this.$message.success('退出成功')
      },
      async loadData() {
        const {data: resData} = await this.$http.get('menus')
        const {data, meta: {status, msg}} = resData
        if (status === 200) {
          this.menus = data
        } else {
          this.$message.error(msg)
        }
      }
    }

  }
</script>

<style>
  .container {
    height: 100%;
  }

  .header {
    background-color: #b3c0d1;
  }

  .header .middle {
    line-height: 60px;
    color: #fff;
    text-align: center;
  }

  .header .loginout {
    line-height: 60px;
    text-decoration: none;
  }

  .aside {
    background-color: #d3dce6;
  }

  .aside .menu {
    height: 100%;
  }

  .main {
    background-color: #e9eef3;
    height: 100%;
  }
</style>
