<template>
  <div>
    <Layout>
      <Sider class="sider" width="200" collapsible :collapsed-width="78" v-model="isCollapsed">
        <slot name="sidebar"></slot>
      </Sider>
      <Content class="content" :class="{ 'content-expand' : isCollapsed }">
        <slot name="content"></slot>
      </Content>
    </Layout>
  </div>
</template>

<script>
    export default {
      name: 'main-container',
      props: {
        isCollapsed: { type: Boolean, default: false }
      },
      data () {
          return {
          }
      },
      computed: {
      }
    }
</script>

<style scoped>
  .sider {
    position: fixed;
    left: 0;
    height: 100%;
    z-index: 1;
  }
  .content {
    margin-top: 60px;
    margin-left: 200px;
    padding: 16px;
    background: #e8e8e9;
    transition: all 0.2s ease-in-out;
  }
  .content-expand{
    margin-left: 78px;
  }
</style>
