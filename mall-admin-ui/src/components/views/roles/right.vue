<template>
  <el-card class="box-card">
    <cus-Breadcrumb level1='权限管理' level2='权限列表'></cus-Breadcrumb>
    <!--表格-->
    <el-table
      class="td"
      height="450px"
      border
      stripe
      style="width: 100%"
      :data="list">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: "right",
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
        this.$http.defaults.headers.common['Authorization'] =
          sessionStorage.getItem('token')
        const res = await this.$http.get('rights/list')
        const data = res.data
        this.list = data.data
      }
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
    /* overflow: auto; */
  }

  .td {
    margin-top: 20px;
  }
</style>
