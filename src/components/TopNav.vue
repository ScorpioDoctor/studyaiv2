<template>
  <div>
    <Header class="header">
      <Row>
        <i-col :xs="2" :sm ="2">
          <router-link to="/">
            <img src="../assets/logo.png" alt="人工智能社区" class="logo"/>
          </router-link>
        </i-col>
        <i-col :xs="18" :sm ="18">
          <Menu mode="horizontal" :active-name="activeName">
            <MenuItem name="/jqxx" to="/jqxx">机器学习</MenuItem>
            <MenuItem name="/jqsj" to="/jqsj">机器视觉</MenuItem>
            <MenuItem name="/zryy" to="/zryy">自然语言</MenuItem>
            <MenuItem name="/yysb" to="/yysb">语音识别</MenuItem>
            <MenuItem name="/zdjs" to="/zdjs">机器人/自动驾驶</MenuItem>
            <MenuItem name="/dsj" to="/dsj">大数据</MenuItem>
            <MenuItem name="/lhjy" to="/lhjy">量化交易</MenuItem>
            <MenuItem name="/qkl" to="/qkl">区块链</MenuItem>
            <MenuItem name="/xnxs" to="/xnxs">虚拟/增强现实</MenuItem>
            <MenuItem name="/wlw" to="/wlw">物联网</MenuItem>
          </Menu>
        </i-col>
        <i-col :xs="4" :sm ="4">
          <Row>
            <i-col span="6">
              <Dropdown>
                <Button type="success">创作</Button>
                <DropdownMenu slot="list">
                  <router-link to="/blog/create"><DropdownItem>写博客</DropdownItem></router-link>
                  <DropdownItem>提问题</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="6">
              <Dropdown transfer>
                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"></Avatar>
                <DropdownMenu slot="list" transfer>
                  <DropdownItem>我的主页</DropdownItem>
                  <DropdownItem>我的收藏</DropdownItem>
                  <DropdownItem>设置<Badge status="error" /></DropdownItem>
                  <router-link to="/login"><DropdownItem divided>立即登录</DropdownItem></router-link>
                  <DropdownItem><span @click="loginOut()">退出登录</span></DropdownItem>
                  <router-link to="/regist"><DropdownItem>立即注册</DropdownItem></router-link>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="6">
              <Dropdown>
                <Badge :count="count" :offset="[20,4]">
                  <Icon type="md-notifications-outline" size="24" />
                </Badge>
                <DropdownMenu slot="list">
                  <Tabs value="notification">
                    <TabPane label="通知" name="notification">
                      <div class="notifications">通知内容</div>
                    </TabPane>
                    <TabPane label="关注" name="follow">
                      <div class="notifications">关注内容</div>
                    </TabPane>
                    <TabPane label="系统" name="system">
                      <div class="notifications">系统内容</div>
                    </TabPane>
                  </Tabs>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="6">
              <Icon type="md-color-palette" size="24" @click="openTheme = true" />
            </i-col>
          </Row>
        </i-col>
      </Row>
      <Drawer title="关于我们" v-model="openTheme" :closable="false" width="365">
        <Row>
          <h3>运营团队</h3>
        </Row>
        <Divider></Divider>
        <Row>
          <h3>加入我们</h3>
        </Row>
        <Divider></Divider>
        <Row>
          <h3>合作伙伴</h3>
        </Row>
        <Divider></Divider>
        <Row>
          <h3>商业合作</h3>
        </Row>
      </Drawer>
    </Header>
  </div>
</template>

<script>
import cookie from '../store/cookie'

export default {
  name: 'top-nav',
  data () {
    return {
      activeName: this.$route.path,
      count: 5,
      openTheme: false,
      isCollapsed: false
    }
  },
  methods: {
    loginOut () {
      cookie.delCookie('token')
      cookie.delCookie('username')
      cookie.delCookie('userid')
      // 存储,更新 store
      this.$store.dispatch('setInfo')
      // 跳转到登录
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding-right: 0;
    padding-left: 0;
    background: #fff;
    z-index: 3;
  }
  .logo {
    margin-top: 5px;
    height: 50px;
  }
  .notifications {
    height: 150px;
    text-align: center;
  }
</style>
