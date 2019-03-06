<template>
  <div>
    <Card style="margin-bottom: 16px;" v-for="(item,idx) in articles" :key="item.id">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        <span @click="handleSelect(item.category1.id, item.id)">{{item.title}}</span>
      </p>
      <a href="#" slot="extra">
        <Icon type="ios-loop-strong"></Icon>
        <Icon type="ios-star" v-for="n in idx%4" :key="n"></Icon>
      </a>
      <p>
        {{item.brief}}
      </p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  props: { 'articles': Array },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    handleSelect (cat1id, id) {
      this.$router.push({ path: `/blog/` + cat1id + `/article/` + id })
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
