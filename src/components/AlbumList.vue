<template>
  <div>
    <Card shadow style="margin: 8px;width: 252px; float: left;" v-for="(item, idx) in albums" :key="item.id">
      <h3 slot="title">{{item.name}}</h3>
      <a href="#" slot="extra">
        <Icon type="ios-loop-strong"></Icon>
        <Icon type="ios-star" v-for="n in idx%4" :key="n"></Icon>
      </a>
      <div style="text-align:center">
        <img :src="item.cover" width="220px" height="135px" @click="handleSelect(item.category1.id,item.id)">
        <span><Icon type="ios-hand" size="20"/>: {{item.click_num}}</span> ·
        <span><Icon type="ios-eye" size="24"/>: {{item.focus_num}} </span> ·
        <span><Icon type="ios-heart" size="20"/>: 100 </span>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'album-list',
  props: { 'albums': Array },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    handleSelect (cat1id, id) {
      this.$router.push({ path: `/blog/` + cat1id + `/album/` + id })
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
