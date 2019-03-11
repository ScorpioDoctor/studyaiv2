<template>
  <div class="main">
    <Row class="infos">
      <Card style="height: 152px">
        <Row>
          <i-col :span="5"><img :src="article.cover" height="120px"/></i-col>
          <i-col :span="16">
            <h2>【文章：{{article.title}}】</h2>
            <div style="margin-top: 8px;">
              <span><Icon type="ios-hand" size="20"/>: {{article.click_num}}</span> ·
              <span><Icon type="ios-eye" size="24"/>: {{article.comment_num}} </span> ·
              <span><Icon type="ios-heart" size="20"/>: {{article.favor_num}} </span> ·
              <span>作者：嘻嘻嘻</span>
            </div>
            <div style="margin-top: 8px;">
              <Button v-if="hasFav" @click="deleteCollect">已收藏</Button>
              <Button v-else @click="addCollect">收藏</Button>
              <Button>评论</Button>
              <Button>分享</Button>
            </div>
          </i-col>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top: 8px">
      <Tabs>
        <TabPane label="该文章的内容页" icon="logo-apple">
          <Card>
            <div v-html="article.content"></div>
          </Card>
        </TabPane>
        <TabPane label="该文章的评论列表" icon="logo-windows">标签二的内容</TabPane>
        <TabPane label="其他相似的文章" icon="logo-tux">标签三的内容</TabPane>
      </Tabs>
    </Row>
  </div>
</template>

<script>
  import {addFavor, delFavor, getArticles, getFavor} from '../../api/api'
  import cookie from "../../store/cookie";

export default {
  name: 'ArticleDetail',
  data () {
    return {
      articleId: -1,
      article: Object,
      hasFav: false
    }
  },
  methods: {
    obtainArticles (articleId) {
      getArticles({ id: articleId }).then(
        (response) => {
          console.log(response.data)
          this.article = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    hasFavored (articleId) {
      if (cookie.getCookie('token')) {
        getFavor(this.articleId).then((response)=> {
          this.hasFav = true
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    addCollect () {
      if (cookie.getCookie('token')) {
        addFavor({
          article: this.articleId
        }).then((response)=> {
          this.hasFav = true
          this.$Message.success('已经成功加入收藏夹')
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        this.$Message.success('登陆以后才可以收藏喔')
      }
    },
    deleteCollect () {
      delFavor(this.articleId).then((response)=> {
        this.hasFav = false
        this.$Message.success('收藏已经取消')
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
  created () {
    this.articleId = this.$route.params.id
    this.obtainArticles(this.articleId)
    this.hasFavored(this.articleId)
  }
}
</script>

<style scoped>
  .main {
    /*margin-top: 2px;*/
  }
</style>
