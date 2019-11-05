<template>
  <div class="login-wrap">
    <el-form
      label-position="top"
      label-width="80px"
      :model="formdata" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin" type="primary" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        formdata: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      // handleLogin() {
      //   this.$http.post('login', this.formdata)
      //     .then(res => {
      //       console.log(res)
      //       const data = res.data
      //       const {meta: {status, msg}} = data
      //       if (status === 200) {
      //         const token = data.data.token
      //         sessionStorage.setItem('token', token)
      //         this.$message.success(msg)
      //       } else {
      //         this.$message.error(msg)
      //       }
      //
      //     })
      // }

      async handleLogin() {
        const res = await this.$http.post('login', this.formdata)
            console.log(res)
            const data = res.data
            const {meta: {status, msg}} = data
            if (status === 200) {
              const token = data.data.token
              sessionStorage.setItem('token', token)
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
      }
    }
  }
</script>

<style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }

  .login-wrap .login-form .login-btn {
    width: 100%;
  }
</style>
