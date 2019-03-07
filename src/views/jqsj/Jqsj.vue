<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="sidebar">
      <Menu :active-name="activeCat2Name" theme="dark" width="auto" class="sider-menu" :class="menuitemClasses"
            @on-select="handleSelect">
        <MenuItem v-for="cat2 in categories2" :key="cat2.id" :name="cat2.name">
          <Icon type="ios-navigate"></Icon>
          <span>{{cat2.name}}</span>
        </MenuItem>
      </Menu>
    </template>
    <template slot="content">
      <Divider>您选择的算法检索到的所有相关文章共计： 100 篇</Divider>
    </template>
  </main-container>
</template>

<script>

import { getSecondCategories } from '../../api/api'

export default {
  name: 'jqsj',
  data () {
    return {
      isCollapsed: true,
      categories2: [],
      activeCat2Name: -1
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item', this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    obtainCategories2 (parentId) {
      getSecondCategories({ params: { parent: parentId } }).then(
        (response) => {
          this.categories2 = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    handleSelect (name) {
      console.log(name)
    }
  },
  created () {
    this.obtainCategories2(2)
  }
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
