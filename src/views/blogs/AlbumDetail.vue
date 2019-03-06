<template>
  <div class="main">
    <Row class="infos">
      <Card style="height: 152px">
        <Row>
          <i-col :span="4"><img :src="album.cover" height="120px"/></i-col>
          <i-col :span="16" :offset="1">
            <h2>【专辑：{{album.name}}】</h2>
            <div style="margin-top: 8px;">
              <span><Icon type="ios-hand" size="20"/>: {{album.click_num}}</span> ·
              <span><Icon type="ios-eye" size="24"/>: {{album.focus_num}} </span> ·
              <span><Icon type="ios-heart" size="20"/>: 100 </span> ·
              <span>作者：哈哈哈</span>
            </div>
            <div style="margin-top: 8px;">
              <p>{{album.brief}}</p>
            </div>
          </i-col>
          <i-col :span="3">
            <Button>关注</Button>
            <Button>点赞</Button>
            <Button>分享</Button>
          </i-col>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top: 8px">
      <Tabs>
        <TabPane label="该专辑的文章列表" icon="logo-apple">
          <article-list :articles="articles.results"></article-list>
        </TabPane>
        <TabPane label="该专辑的评论列表" icon="logo-windows">标签二的内容</TabPane>
        <TabPane label="该作者的其他专辑" icon="logo-tux">标签三的内容</TabPane>
      </Tabs>
    </Row>
  </div>
</template>

<script>
import { getAlbums, getArticles } from '../../api/api'
import ArticleList from '../../components/ArticleList'

export default {
  components: { ArticleList },
  name: 'AlbumDetail',
  data () {
    return {
      album: Object,
      articles: []
    }
  },
  methods: {
    obtainAlbum (albumId) {
      getAlbums({ id: albumId }).then(
        (response) => {
          // console.log(response.data)
          this.album = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    obtainArticles (albumId) {
      getArticles({ params: { album: albumId } }).then(
        (response) => {
          console.log(response.data)
          this.articles = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    var albumId = this.$route.params.id
    this.obtainAlbum(albumId)
    this.obtainArticles(albumId)
  }
}
</script>

<style scoped>
  .main {
    /*margin-top: 2px;*/
  }
</style>
