<template>
  <el-card class="box-card">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索框-->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input class="searchInput" clearable placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="list"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        list: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        const res = await this.$http.get('users?pagenum=1&pagesize=10')
        console.log(res)
        const data = res.data
        const {meta: {msg, status}} = data
        if (status === 200) {
          const {data: {users}} = data
          this.list = users
        } else {
          this.$message.error(msg)
        }
      }
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
  }

  .searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .searchArea .searchInput {
    width: 350px;
  }

</style>
