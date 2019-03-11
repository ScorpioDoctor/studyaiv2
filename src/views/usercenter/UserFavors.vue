<template>
  <Card>
    <Tabs type="card">
      <TabPane label="收藏的专辑" icon="logo-apple">
        <Table border :columns="albumColumns" :data="albumFavors">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="handleShow('album', row, index)">查看</Button>
            <Button type="error" size="small" @click="handleRemove('album', index)">删除</Button>
          </template>
        </Table>
      </TabPane>
      <TabPane label="收藏的文章" icon="logo-windows">
        <Table border :columns="articleColumns" :data="articleFavors">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="handleShow('article', row, index)">查看</Button>
            <Button type="error" size="small" @click="handleRemove('article', index)">删除</Button>
          </template>
        </Table>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
  import {delAlbumFavor, delFavor, getAllAlbumFavors, getAllArticleFavors} from "../../api/api";

  export default {
    name: "user-favors",
    data() {
      return {
        articleColumns: [
          {
            title: '收藏编号',
            key: 'id',
            sortable: true
          },
          {
            title: '文章标题',
            key: 'title',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.article.title)
              ])
            },
          },
          {
            title: '所属专辑',
            key: 'album',
            sortable: true,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.article.album.name)
              ])
            }
          },
          {
            title: '一级类目',
            key: 'category1',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.article.category1.name)
              ])
            }
          },
          {
            title: '二级类目',
            key: 'category2',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.article.category2.name)
              ])
            },
            sortable: true
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        articleFavors: [],
        albumColumns: [
          {
            title: '收藏编号',
            key: 'id',
            sortable: true
          },
          {
            title: '专辑名称',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.album.name)
              ])
            },
          },
          {
            title: '一级类目',
            key: 'category1',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.album.category1.name)
              ])
            }
          },
          {
            title: '二级类目',
            key: 'category2',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.album.category2.name)
              ])
            },
            sortable: true
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        albumFavors: []
      }
    },
    methods: {
      obtainArticlesFavors() {
        getAllArticleFavors().then(
          (response) => {
            this.articleFavors = response.data
          }
        ).catch((error) => {
          console.log(error)
        })
      },
      obtainAlbumFavors() {
        getAllAlbumFavors().then(
          (response) => { this.albumFavors = response.data }
        ).catch((error) => { console.log(error) })
      },
      handleShow (table, row, index) {
        if (table === 'article') {
          this.$router.push({
            name:'article', params:{cat1id:row.article.category1.id, id: row.article.id}
          })
        }
        if (table === 'album') {
          this.$router.push({
            name:'album', params:{cat1id:row.album.category1.id, id: row.album.id}
          })
        }
      },
      handleRemove (table, index) {
        if (table === 'article') {
          let deletedFavor = this.articleFavors.splice(index, 1)[0];
          delFavor(deletedFavor.article.id).then((response)=> {
            this.$Message.success('收藏已经取消')
          }).catch(function (error) {
            console.log(error);
          });
        }
        if (table === 'album') {
          let deletedFavor = this.albumFavors.splice(index, 1)[0];
          delAlbumFavor(deletedFavor.album.id).then((response)=> {
            this.$Message.success('收藏已经取消')
          }).catch(function (error) {
            console.log(error);
          });
        }

      },
    },
    created () {
      this.obtainArticlesFavors()
      this.obtainAlbumFavors()
    }
  }
</script>

<style scoped>

</style>
