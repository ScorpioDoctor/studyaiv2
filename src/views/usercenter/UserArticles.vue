<template>
  <div>
    <Card>
      <Row>
        <span><strong>请选择以下删选条件： </strong></span>
        <span style="margin-left: 16px" @click="$router.push({name: 'create'})"><a><strong>或写新文章： </strong></a></span>
      </Row>
      <Row :gutter="8">
        <i-col :span="6">
          <Select v-model="album" clearable @on-change="handleAlbumSelect()" placeholder="请选择专辑进行筛选">
            <Option v-for="item in albums" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </i-col>
        <i-col :span="6">
          <Select v-model="cat1" clearable @on-change="handleCat1Select()" placeholder="请选择一级类目进行筛选">
            <Option v-for="item in categories1" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </i-col>
        <i-col :span="6">
          <Select v-model="cat2" clearable @on-change="handleCat2Select()" placeholder="请选择二级类目进行筛选">
            <Option v-for="item in categories2" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </i-col>
        <i-col :span="6">
          <Input v-model="search" search placeholder="请输入想要搜索的关键内容" @on-change="handleSearch()"/>
        </i-col>
      </Row>
      <Row>
        <h5>您当前总共有文章 {{totalCount}} 篇， 以下表格每页展示 {{articles.length}} 篇, 共有 {{totalCount/articles.length}} 页 </h5>
      </Row>
    </Card>
    <Card style="margin-top: 8px">
      <Table border :columns="columns" :data="articles">
        <template slot-scope="{ row, index }" slot="title">
          <Input type="text" v-model="editTitle" v-if="editIndex === index" />
          <span v-else>{{ row.title }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="editIndex = -1">取消</Button>
          </div>
          <div v-else>
            <Button @click="handleEdit(row, index)">操作</Button>
          </div>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import { getAlbums, getArticles, getFirstCategories, getSecondCategories } from '../../api/api'
import cookie from '../../store/cookie'

export default {
  name: 'UserArticles',
  data () {
    return {
      columns: [
        {
          title: '编号',
          key: 'id',
          sortable: true
        },
        {
          title: '标题',
          slot: 'title'
        },
        {
          title: '所属专辑',
          key: 'album',
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('span', params.row.album.name)
            ])
          }
        },
        {
          title: '点击量',
          key: 'click_num',
          sortable: true
        },
        {
          title: '收藏量',
          key: 'favor_num',
          sortable: true
        },
        {
          title: '一级类目',
          key: 'category1',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.category1.name)
            ])
          },
          filters: [
            {
              label: '机器学习',
              value: '机器学习'
            },
            {
              label: '机器视觉',
              value: '机器视觉'
            },
            {
              label: '量化交易',
              value: '量化交易'
            },
            {
              label: '大数据',
              value: '大数据'
            },
            {
              label: '自然语言',
              value: '自然语言'
            }
          ],
          filterMethod (value, row) {
            return row.category1.name.indexOf(value) > -1
          }
        },
        {
          title: '二级类目',
          key: 'category2',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.category2.name)
            ])
          },
          sortable: true
        },
        {
          title: '封面图像',
          key: 'cover'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      articles: [],
      totalCount: 0,
      editIndex: -1, // 当前聚焦的输入框的行数
      editTitle: '', // 第一列输入框，当前聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      albums: [],
      categories1: [],
      categories2: [],
      album: '',
      cat1: '',
      cat2: '',
      userid: '',
      search: ''
    }
  },
  methods: {
    obtainCategories1 (queryParams) {
      getFirstCategories({ params: queryParams }).then(
        (response) => {
          this.categories1 = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    obtainCategories2 (queryParams) {
      getSecondCategories({ params: queryParams }).then(
        (response) => {
          this.categories2 = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    obtainAlbums (queryParams) {
      getAlbums({ params: queryParams }).then(
        (response) => {
          this.albums = response.data.results
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    obtainArticles (queryParams) {
      getArticles({ params: queryParams }).then(
        (response) => {
          this.articles = response.data.results
          this.totalCount = response.data.count
          console.log(response.data)
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    handleEdit (row, index) {
      this.editTitle = row.title
      // this.editAge = row.age;
      // this.editAddress = row.address;
      // this.editBirthday = row.birthday;
      this.editIndex = index
    },
    handleSave (index) {
      this.articles[index].title = this.editTitle
      // this.data[index].age = this.editAge;
      // this.data[index].birthday = this.editBirthday;
      // this.data[index].address = this.editAddress;
      this.editIndex = -1
    },
    handleAlbumSelect () {
      this.obtainArticles({ user: this.userid, album: this.album, category1: this.cat1, category2: this.cat2 })
    },
    handleCat1Select () {
      this.obtainCategories2({ parent: this.cat1 })
      this.obtainArticles({ user: this.userid, album: this.album, category1: this.cat1, category2: this.cat2 })
    },
    handleCat2Select () {
      this.obtainArticles({ user: this.userid, album: this.album, category1: this.cat1, category2: this.cat2 })
    },
    handleSearch () {
      this.obtainArticles({ user: this.userid, album: this.album, category1: this.cat1, category2: this.cat2, search: this.search })
    }
  },
  created () {
    this.userid = cookie.getCookie('userid') || ''
    if (this.userid !== '') {
      this.obtainCategories1()
      this.obtainAlbums({ user_id: this.userid })
      this.obtainArticles({ user: this.userid })
    }
  }
}
</script>

<style scoped>

</style>
