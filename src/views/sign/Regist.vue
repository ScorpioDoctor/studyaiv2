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
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="手机号" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入你的手机号"/>
              </FormItem>
              <FormItem label="验证码" prop="code">
                <Input v-model="formValidate.code" placeholder="请输入你收到的短信验证码">
                  <Button slot="append" @click="handleVerifyCode">获取短信验证码</Button>
                </Input>
              </FormItem>
              <FormItem label="昵称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入你的用户昵称"/>
              </FormItem>
              <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formValidate.passwd" placeholder="请输入你的密码"/>
              </FormItem>
              <FormItem label="重复密码" prop="passwd2">
                <Input type="password" v-model="formValidate.passwd2" placeholder="请再次输入你的密码"/>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">立即注册</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置表单</Button>
              </FormItem>
            </Form>
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
import { getVerifyCode, registUser } from '../../api/api'
import cookie from '../../store/cookie'

export default {
  name: 'regist',
  components: {},
  data () {
    return {
      isCollapsed: true,
      formValidate: {
        name: '',
        phone: '',
        code: '',
        passwd: '',
        passwd2: ''
      },
      ruleValidate: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'change' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        passwd2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleVerifyCode: function () {
      if (this.formValidate.phone !== '') {
        this.$Message.success('验证码短信已发送!')
        getVerifyCode({
          mobile: this.formValidate.phone
        }).then((response) => {
          console.log(response)
          this.$Message.success('你的验证码为: ' + response.data['code'])
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        this.$Message.error('请输入你的手机号以便接收验证码短信!')
      }
    },
    handleSubmit: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.passwd !== this.formValidate.passwd2) {
            this.$Message.error('两次输入的密码不一致!')
            return
          }
          registUser({
            nickname: this.formValidate.name,
            mobile: this.formValidate.phone,
            code: this.formValidate.code,
            password: this.formValidate.passwd
          }).then((response) => {
            console.log(response.data)
            cookie.setCookie('username', response.data.username, 7)
            cookie.setCookie('userid', response.data.userid, 7)
            cookie.setCookie('token', response.data.token, 7)
            // 存储在store
            // 更新store数据
            this.$store.dispatch('setInfo')
            // 跳转到首页页面
            this.$router.push({ name: 'home' })
          }).catch((error) => {
            console.log(error)
          })
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
