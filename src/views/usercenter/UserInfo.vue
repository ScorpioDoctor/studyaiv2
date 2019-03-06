<template>
  <div>
    <Card>
      <Row>
        <i-col :span="5">
          <div style="width: 100%; height: 1px"></div>
        </i-col>
        <i-col :span="14">
          <Input v-model="nickname">
            <span slot="prepend">我的昵称</span>
            <Button slot="append">修改</Button>
          </Input>
          <Divider></Divider>
          <Input v-model="email">
            <span slot="prepend">我的邮箱</span>
            <Button slot="append">修改</Button>
          </Input>
          <Divider></Divider>
          <Input v-model="mobile">
            <span slot="prepend">我的手机号</span>
            <Button slot="append">修改</Button>
          </Input>
        </i-col>
        <i-col :span="5">
          <div style="width: 100%; height: 1px"></div>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getUserDetail } from '../../api/api'

export default {
  name: 'UserInfo',
  data () {
    return {
      nickname: '',
      email: '',
      mobile: ''
    }
  },
  methods: {
    obtainUserInfo () {
      getUserDetail({ username: 'abc' }).then(
        (res) => {
          console.log(res.data)
          this.nickname = res.data.nickname
          this.mobile = res.data.mobile
          this.email = res.data.email
        }
      ).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.obtainUserInfo()
  }
}
</script>

<style scoped>

</style>
