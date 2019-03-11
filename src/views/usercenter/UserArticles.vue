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
        <template slot-scope="{ row }" slot="title">
          <strong>{{ row.title }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleShow(row, index)">查看</Button>
          <Button type="success" size="small" style="margin-right: 5px" @click="handleChange(row, index)">修改</Button>
          <Button type="error" size="small" @click="handleRemove(index)">删除</Button>
        </template>
      </Table>
    </Card>
    <Modal
      draggable scrollable
      v-model="showEdtBox"
      title="修改文章基本信息"
      @on-ok="handleModelOk"
      @on-cancel="handleModelCancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文章标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入文章标题..." />
        </FormItem>
        <FormItem label="所属专辑" prop="album">
          <Select v-model="formValidate.album">
            <Option v-for="item in albums" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <Row>
          <i-col :span="12">
            <FormItem label="一级类目" prop="category1" >
              <Select v-model="formValidate.category1" @on-change="handleCategory1Select()">
                <Option v-for="item in categories1" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <FormItem label="二级类目" prop="category2">
              <Select v-model="formValidate.category2"  >
                <Option v-for="item in categories2" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <FormItem label="文章标签" prop="tags">
          <Select v-model="formValidate.tags" multiple >
            <Option v-for="item in tags" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="文章简介" prop="brief">
          <Input v-model="formValidate.brief" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入20--120字内的简介..."/>
        </FormItem>
        <FormItem label="文章封面" prop="cover">
          <Upload :before-upload="handleBeforeUpload" action="/">
            <Button icon="ios-cloud-upload-outline">为文章选择封面图像</Button>
          </Upload>
          <p v-if="formValidate.cover !== null">上传的文件名: {{ formValidate.cover.name }}</p>
          <img :src="formValidate.cover" width="150px" height="90px"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交修改</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置表单</Button>
          <Button type="error" @click="handleEdit(editArticle)" style="margin-left: 8px">编辑文章内容</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {getAlbums, getArticles, getFirstCategories, getSecondCategories, getTags} from '../../api/api'
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
      editArticle: Object, // 当前要修改的那一行对应的文章
      albums: [],
      categories1: [],
      categories2: [],
      tags: [],
      album: '',
      cat1: '',
      cat2: '',
      userid: '',
      search: '',
      showEdtBox: false,
      formValidate: {
        title: '',
        category1: '',
        category2: '',
        album: '',
        tags: [],
        cover: null,
        brief: '',
        content: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' }
        ],
        album: [
          {type: 'number', required: true, message: '文章所属的专辑是必填的', trigger: 'blur' }
        ],
        category1: [
          {type: 'number', required: true, message: '一级分类是必填的', trigger: 'blur' }
        ],
        category2: [
          {type: 'number', required: true, message: '二级分类是必填的', trigger: 'blur' }
        ],
        tags: [
          {type: 'array', required: true, message: '文章的分类标签是必填的', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '文章的简介是必填的', trigger: 'blur' },
          { type: 'string', min: 20, max: 120, message: '简介内容应该在20到120个字之间', trigger: 'blur' }
        ]
      },
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
    obtainTags (queryParams) {
      getTags({ params: queryParams }).then(
        (response) => {
          this.tags = response.data
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
    },
    handleShow (row, index) {
      this.$router.push({
        name:'article',
        params:{cat1id:row.category1.id, id: row.id}
      })
    },
    handleRemove (index) {
      this.articles.splice(index, 1);
    },
    handleChange (row, index) {
      this.showEdtBox = true
      this.editIndex = index
      this.editArticle = this.articles[this.editIndex]
      // 填充表单
      // this.formValidate = this.editArticle
      this.formValidate.title = this.editArticle.title
      this.formValidate.brief = this.editArticle.brief
      this.formValidate.album = this.editArticle.album.id
      this.formValidate.category1 = this.editArticle.category1.id
      this.obtainCategories2({ parent: this.formValidate.category1 })
      this.formValidate.category2 = this.editArticle.category2.id
      this.formValidate.tags = this.editArticle.tags
      this.formValidate.cover = this.editArticle.cover

    },
    handleEdit (article) {
      this.$router.push({
        name:'articleupdate', params:{article: article}
      })
    },
    handleModelOk () {
      this.$Message.info('Clicked ok');
      this.showEdtBox = false
      this.handleReset('formValidate')
      this.editIndex = -1
      this.editArticle = ''
    },
    handleModelCancel () {
      this.$Message.info('Clicked cancel');
      this.showEdtBox = false
      this.handleReset('formValidate')
      this.editIndex = -1
      this.editArticle = ''
    },
    handleBeforeUpload (file) {
      this.formValidate.cover = file;
      return false;
    },
    handleCategory1Select () {
      this.obtainCategories2({ parent: this.formValidate.category1 })
    },
    handleSubmit (name) {
      let userid = cookie.getCookie('userid')
      if (userid === '') {
        this.$Message.error('没有登录')
        return
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  created () {
    this.userid = cookie.getCookie('userid') || ''
    if (this.userid !== '') {
      this.obtainTags()
      this.obtainCategories1()
      this.obtainAlbums({ user_id: this.userid })
      this.obtainArticles({ user: this.userid })
    }
  }
}
</script>

<style scoped>

</style>
