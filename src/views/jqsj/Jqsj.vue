<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="sidebar">
      <Menu active-name="1-1" theme="dark" width="auto" class="sider-menu" :class="menuitemClasses">
        <MenuItem name="1-1">
          <Icon type="ios-navigate"></Icon>
          <span>基础理论</span>
        </MenuItem>
        <MenuItem name="1-2">
          <Icon type="ios-analytics-outline"/>
          <span>研究前沿</span>
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-search"></Icon>
          <span>OpenCV</span>
        </MenuItem>
        <MenuItem name="1-4">
          <Icon type="ios-settings"></Icon>
          <span>Matlab</span>
        </MenuItem>
        <MenuItem name="1-5">
          <Icon type="ios-analytics-outline"/>
          <span>SKImage</span>
        </MenuItem>
        <MenuItem name="1-6">
          <Icon type="ios-analytics-outline"/>
          <span>PyTorch</span>
        </MenuItem>
        <MenuItem name="1-7">
          <Icon type="ios-analytics-outline"/>
          <span>TensorFlow</span>
        </MenuItem>
      </Menu>
    </template>
    <template slot="content">
      <Divider>您选择的算法检索到的所有相关文章共计： 100 篇</Divider>
    </template>
  </main-container>
</template>

<script>

  export default {
    name: 'jqxx',
    data() {
      return {
        isCollapsed: true,
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item', this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .sider-menu {
    margin-top: 60px;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    /*width: 0;*/
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
