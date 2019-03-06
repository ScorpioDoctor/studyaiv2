<template>
  <div>
    <Row class="hello">
      <img alt="Vue logo" src="../../assets/logo.png">
    </Row>
    <Row>
      <Card class="formbox">
        <Row>
          <i-col span="7">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
          <i-col span="10">
            <div>
              <span>请选择登录方式: </span>
              <RadioGroup v-model="loginManner">
                <Radio label="name">账户名</Radio>
                <Radio label="email">邮箱</Radio>
                <Radio label="phone">手机号</Radio>
              </RadioGroup>
            </div>
            <Divider></Divider>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="账户名" prop="name" v-if="loginManner === 'name'">
                <Input v-model="formValidate.name" placeholder="请输入你的账户名"/>
              </FormItem>
              <FormItem label="邮箱" prop="email" v-if="loginManner === 'email'">
                <Input v-model="formValidate.email" placeholder="请输入你的邮箱"/>
              </FormItem>
              <FormItem label="手机号" prop="phone" v-if="loginManner === 'phone'">
                <Input v-model="formValidate.phone" placeholder="请输入你的手机号"/>
              </FormItem>
              <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formValidate.passwd" placeholder="请输入你的密码"/>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                <Button style="margin-left: 8px">忘记密码?找回</Button>
              </FormItem>
            </Form>
          </i-col>
          <i-col span="7">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
        </Row>
        <Row>
          <i-col span="8">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
          <i-col span="9">
            <Row :gutter="64">
              <i-col span="8">
                <Button>微信登录</Button>
              </i-col>
              <i-col span="8">
                <Button>QQ登录</Button>
              </i-col>
              <i-col span="8">
                <Button>Github登录</Button>
              </i-col>
            </Row>
          </i-col>
          <i-col span="7">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
// @ is an alias to /src
import { login } from '../../api/api'
import cookie from '../../store/cookie'

export default {
  name: 'login',
  components: {},
  data () {
    return {
      isCollapsed: true,
      loginManner: 'phone',
      formValidate: {
        name: '',
        email: '',
        phone: '',
        passwd: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'change' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleSubmit: function (name) {
      this.$refs[name].validate((valid) => {
        var loginInfo = this.formValidate.name
        if (this.loginManner === 'email') {
          loginInfo = this.formValidate.email
        }
        if (this.loginManner === 'phone') {
          loginInfo = this.formValidate.phone
        }
        if (valid) {
          login({ username: loginInfo, password: this.formValidate.passwd }).then(
            (response) => {
              this.$Message.success('成功登陆!')
              // 本地存储Token信息
              cookie.setCookie('token', response.data.token, 7)
              cookie.setCookie('username', loginInfo, 7)
              // cookie.setCookie('userid', res.data.id, 7)
              // 存储,更新 store
              this.$store.dispatch('setInfo')
              // 跳转到首页页面
              this.$router.push({ name: 'home' })
            }
          )
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>
  .hello {
    margin-top: 50px;
    text-align: center;
  }
</style>
