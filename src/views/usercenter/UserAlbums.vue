<template>
  <div>
    <Card>
      <Row :gutter="32">
        <i-col :span="3">
          <Button v-if="!isCreate" @click="isCreate=true">新建专辑</Button>
          <Button v-if="isCreate" @click="isCreate=false">取消新建</Button>
        </i-col>
        <i-col :span="10" v-if="isCreate">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="专辑名称" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入专辑名称..." />
            </FormItem>
            <Row>
              <i-col :span="12">
                <FormItem label="一级类目" prop="category1">
                  <Select v-model="formValidate.category1" @on-change="handleObtainCats2()" >
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
            <FormItem label="专辑标签" prop="tags">
              <Select v-model="formValidate.tags" multiple >
                <Option v-for="item in tags" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="专辑简介" prop="brief">
              <Input v-model="formValidate.brief" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入20--120字内的专辑简介..."/>
            </FormItem>
            <FormItem label="专辑封面" prop="cover">
              <Upload :before-upload="handleBeforeUpload" action="/">
                <Button icon="ios-cloud-upload-outline">为专辑选择封面图像</Button>
              </Upload>
              <p v-if="formValidate.cover !== null">上传的文件名: {{ formValidate.cover.name }}</p>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">立即新建</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置表单</Button>
            </FormItem>
          </Form>
        </i-col>
        <i-col :span="11">
          <div style="width: 100%;height: 1px"></div>
        </i-col>
      </Row>
    </Card>
    <Card style="margin-top: 8px">
      <Row>
        <h5>您当前总共有专辑 {{totalCount}} 个， 以下表格每页展示 {{albums.length}} 个, 共有 {{totalCount/albums.length}} 页 </h5>
      </Row>
      <Table border :columns="columns" :data="albums">
        <template slot-scope="{ row, index }" slot="name">
          <Input type="text" v-model="editName" v-if="editIndex === index" />
          <span v-else>{{ row.name }}</span>
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
import { getAlbums, createAlbum, getFirstCategories, getSecondCategories, getTags } from '../../api/api'
import cookie from '../../store/cookie'

export default {
  name: 'UserAlbums',
  data () {
    return {
      isCreate: false,
      formValidate: {
        name: '',
        category1: '',
        category2: '',
        tags: [],
        cover: null,
        brief: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '专辑名称不能为空', trigger: 'blur' }
        ],
        category1: [
          {type: 'number', required: true, message: '专辑的一级分类是必填的', trigger: 'blur' }
        ],
        category2: [
          {type: 'number', required: true, message: '专辑的二级分类是必填的', trigger: 'blur' }
        ],
        tags: [
          {type: 'array', required: true, message: '专辑的分类标签是必填的', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '专辑的简介是必填的', trigger: 'blur' },
          { type: 'string', min: 20, max: 120, message: '简介内容应该在20到120个字之间', trigger: 'blur' }
        ]
      },
      columns: [
        {
          title: '编号',
          key: 'id',
          sortable: true
        },
        {
          title: '名称',
          slot: 'name'
        },
        {
          title: '点击量',
          key: 'click_num',
          sortable: true
        },
        {
          title: '关注量',
          key: 'focus_num',
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
          }
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
      totalCount: 0,
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: '', // 第一列输入框，当前聚焦的输入框的输入内容，与 data 分离避免重构的闪烁,
      categories1: [],
      categories2: [],
      albums: [ ],
      tags: [],
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
          this.totalCount = response.data.count
          // console.log(response.data)
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    handleEdit (row, index) {
      this.editName = row.name
      // this.editAge = row.age;
      // this.editAddress = row.address;
      // this.editBirthday = row.birthday;
      this.editIndex = index
    },
    handleSave (index) {
      this.albums[index].name = this.editName
      // this.data[index].age = this.editAge;
      // this.data[index].birthday = this.editBirthday;
      // this.data[index].address = this.editAddress;
      this.editIndex = -1
    },
    handleObtainCats2 () {
      this.obtainCategories2({ parent: this.formValidate.category1 })
    },
    handleBeforeUpload (file) {
      this.formValidate.cover = file;
      return false;
    },
    handleSubmit (name) {
      let userid = cookie.getCookie('userid')
      if (userid === '') {
        this.$Message.error('没有登录')
        return
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('user', userid)
          formData.append('name', this.formValidate.name)
          formData.append('brief', this.formValidate.brief)
          formData.append('category1', this.formValidate.category1)
          formData.append('category2', this.formValidate.category2)
          formData.append('cover', this.formValidate.cover) // 封面文件
          // tags 列表[1,2,3]会被立刻转换成字符串['1,2,3'] ，而后台系统需要的是tags 的 ids 列表
          // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
          // formData如何传递数组 https://blog.csdn.net/NAMECZ/article/details/84585709
          this.formValidate.tags.forEach((item) => { formData.append('tags', item) })
          createAlbum(formData).then((response) => {
              this.$Message.success('Success!')
              console.log(response.data)
            }).catch((error) => {
            console.log(error)
          })
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
    var userid = cookie.getCookie('userid') || ''
    if (userid !== '') {
      this.obtainCategories1({})
      this.obtainTags({})
      this.obtainAlbums({ user_id: userid })
    }
  }
}
</script>

<style scoped>

</style>
