<template>
  <div class="login-container">
    <van-form @submit="handleLogin" @failed="onFailed" ref="loginForm">
      <van-field
        v-model="loginForm.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        left-icon="manager"
        :rules="validateUsername"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        left-icon="lock"
        :rules="validatePassword"
      />
      <div style="margin: 16px;">
        <van-button :loading="loading" round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      validateUsername: [{ required: true, trigger: 'onBlur', message: '请填写用户名' }],
      validatePassword: [{ required: true, trigger: 'onBlur', message: '请输入密码' }],
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
