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
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="addUserDialogFormVisible = true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <el-dialog title="添加用户" @closed="handleClose" :visible.sync="addUserDialogFormVisible">
      <el-form
        label-width="100px"
        :model="formData"
        ref="addform"
        :rules="formRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog @closed="handleClose" title="编辑用户" :visible.sync="editUserDialogFormVisiable">
      <el-form
        label-width="100px"
        :model="formData"
        ref="editform"
        :rules="formRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogFormVisiable = false">取消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </div>
    </el-dialog>

    <!--分配角色-->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="用户名" prop="username">
          {{currentUsername}}
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="currentRoleId">
            <el-option disabled label="请选择" :value="-1">
            </el-option>
            <el-option v-for="item in roles"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">

            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogFormVisible = false">取 消</el-button>
        <el-button @click="handleSetRole" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="list"
      style="width: 100%"
      v-loading="loading">
      <!-- 序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="300">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="handleSwitchChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleEditUser(scope.row)" plain size="mini" type="primary" icon="el-icon-edit"
                     circle></el-button>
          <el-button @click="handleDelete(scope.row.id)" plain size="mini" type="danger" icon="el-icon-delete"
                     circle></el-button>
          <el-button @click="handleShowRole(scope.row)" plain size="mini" type="success" icon="el-icon-check"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        list: [],
        loading: true,
        pagenum: 1,
        pagesize: 2,
        total: 0,
        searchValue: '',
        addUserDialogFormVisible: false,
        editUserDialogFormVisiable: false,
        formData: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        formRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}]
        },
        setRoleDialogFormVisible: false,
        currentUsername: '',
        currentRoleId: -1,
        currentUserId: -1,
        roles: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        this.loading = true
        const res = await this.$http.get('users', {
          headers: {
            Authorization: window.sessionStorage.getItem('token')
          },
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: this.searchValue
          }
        })
        this.loading = false
        const data = res.data
        const {meta: {msg, status}} = data
        if (status === 200) {
          const {data: {users, total}} = data
          this.list = users
          this.total = total
        } else {
          this.$message.error(msg)
        }
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.loadData()

      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.loadData()
      },
      handleSearch() {
        this.loadData()
      },
      async handleSwitchChange(user) {
        this.$http.defaults.headers.common['Authorization'] =
          sessionStorage.getItem('token')
        const res = await this.$http.put(
          `users/${user.id}/state/${user.mg_state}`
        )
        const data = res.data
        const {meta: {status, msg}} = data
        if (status === 200) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      },
      handleDelete(id) {
        this.$http.defaults.headers.common['Authorization'] =
          sessionStorage.getItem('token')
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          const res = await this.$http.delete(`users/${id}`)
          const data = res.data
          const {meta: {status, msg}} = data
          if (status === 200) {
            this.pagenum = 1
            this.loadData()
          } else {
            this.$message({
              type: 'success',
              message: msg
            })
          }
        })
          .catch(() => {
            this.$message({
              type: 'info',
              message: msg
            })
          })
      },
      handleClose() {
        for (const key in this.formData) {
          this.formData[key] = ''
        }
      },
      async addUser() {

        this.$refs.addform.validate(async (valid) => {
          if (!valid) {
            this.$message.error('请重新输入')
          } else {
            this.$http.defaults.headers.common['Authorization'] =
              sessionStorage.getItem('token')
            const res = await this.$http.post('users', this.formData)
            const data = res.data
            const {meta: {status, msg}} = data
            if (status === 201) {
              this.addUserDialogFormVisible = false
              this.$message.success(msg)
              this.loadData()
            } else {
              this.$message.error(msg)
            }
          }
        })

      },
      handleEditUser(user) {
        this.editUserDialogFormVisiable = true
        this.formData.username = user.username
        this.formData.email = user.email
        this.formData.mobile = user.mobile
        this.formData.id = user.id
      },
      async editUser() {
        this.$refs.editform.validate(async (valid) => {
          if (!valid) {
            this.$message.error("请重新输入")
          } else {
            this.$http.defaults.headers.common['Authorization'] =
              sessionStorage.getItem('token')
            const res = await this.$http.put(`users/${this.formData.id}`, {
              mobile: this.formData.mobile,
              email: this.formData.email
            })
            const data = res.data
            const {meta: {status, msg}} = data
            if (status === 200) {
              this.$message.success(msg)
              this.editUserDialogFormVisiable = false
              this.loadData()
            } else {
              this.$message.error(msg)
            }
          }
        })
      },
      async handleShowRole(user) {
        this.currentUserId = user.id
        this.currentName = user.username
        this.setRoleDialogFormVisible = true
        this.$http.defaults.headers.common['Authorization'] =
          sessionStorage.getItem('token')
        const res = await this.$http.get('roles')
        this.roles = res.data.data
        const res1 = await this.$http.get(`users/${user.id}`)
        this.currentRoleId = res1.data.data.rid
      },
      async handleSetRole() {
        this.$http.defaults.headers.common['Authorization'] =
          sessionStorage.getItem('token')

        const res = await this.$http.put(`users/${this.currentUserId}/role`, {
          rid: this.currentRoleId
        })

        const {data, meta: {status, msg}} = res.data
        if (status === 200) {
          this.setRoleDialogFormVisible = false
          this.$message.success(msg)
          this.currentUsername = ''
          this.currentRoleId = -1
          this.currentUserId = -1
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
