<template>
    <div>
      <Card>
        <Row>
          <Input v-model="search" search enter-button="搜索" placeholder="根据关键字搜索专辑..." @click="handleSearch"/>
        </Row>
        <Row style="margin-top: 8px">
          <i-col :span="6">
            <Button @click="handleOrdering('click_num')"><Icon type="ios-hand" size="20"/>点击量
              <Icon v-if="orderingName === 'click_num' & orderingType === ''" type="ios-arrow-round-up" :size="24" />
              <Icon v-if="orderingName === 'click_num' & orderingType === '-'" type="ios-arrow-round-down" :size="24" />
            </Button>
          </i-col>
          <i-col :span="6">
            <Button @click="handleOrdering('focus_num')"><Icon type="ios-eye" size="24"/>关注量
              <Icon v-if="orderingName === 'focus_num' & orderingType === ''" type="ios-arrow-round-up" :size="24" />
              <Icon v-if="orderingName === 'focus_num' & orderingType === '-'" type="ios-arrow-round-down" :size="24" />
            </Button>
          </i-col>
          <i-col :span="6">
            <Button><Icon type="ios-love" size="20"/><Icon type="ios-heart" size="20"/>点赞量
              <Icon type="ios-arrow-round-up" :size="24" />
            </Button>
          </i-col>
          <i-col :span="6">
            <Button @click="handleOrdering('add_time')"><Icon type="ios-clock" size="20"/>发布时间
              <Icon v-if="orderingName === 'add_time' & orderingType === ''" type="ios-arrow-round-up" :size="24" />
              <Icon v-if="orderingName === 'add_time' & orderingType === '-'" type="ios-arrow-round-down" :size="24" />
            </Button>
          </i-col>
        </Row>
      </Card>
      <album-list :albums="albums.results"></album-list>
    </div>
</template>

<script>
import { getAlbums } from '../../api/api'
import AlbumList from '../../components/AlbumList'

export default {
  name: 'JqxxBasis',
  components: { AlbumList },
  data () {
    return {
      albums: {},
      orderingName: 'click_num',
      orderingType: '-',
      search: '',
      articles: {}
    }
  },
  methods: {
    handleSearch () {
      this.obtainAlbums({ category1: 17, category2: 42, ordering: this.ordering, search: this.search })
    },
    handleOrdering (orderName) {
      this.orderingName = orderName
      if (this.orderingType === '') {
        this.orderingType = '-'
      } else {
        this.orderingType = ''
      }
      console.log(this.ordering)
    },
    obtainAlbums (queryParams) {
      getAlbums({ params: queryParams }).then(
        (response) => {
          this.albums = response.data
          console.log(this.albums.results)
        }
      ).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    ordering: function () {
      return this.orderingType + this.orderingName
    }
  },
  watch: {
    orderingType: function (val) {
      var ordering = val + this.orderingName
      this.obtainAlbums({ category1: 17, category2: 42, ordering: ordering, search: this.search })
    },
    search: function (val) {
      this.obtainAlbums({ category1: 17, category2: 42, ordering: this.ordering, search: val })
    }
  },
  created () {
    this.obtainAlbums({ category1: 17, category2: 42, ordering: this.ordering, search: this.search })
  }
}
</script>

<style scoped>

</style>
