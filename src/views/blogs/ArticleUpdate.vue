<template>
  <div class="mainbox">
    <Card class="blogbox">
      <Row>
        <span>请选择编辑器类型:  </span>
        <RadioGroup v-model="editorType">
          <Radio label="markdown">MarkDown编辑器</Radio>
          <Radio label="richeditor">富文本编辑器</Radio>
        </RadioGroup>
      </Row>
      <Divider>我思故我在，请开始您的创作吧</Divider>
      <Row class="editor" v-if=" editorType === 'markdown' ">
        <mavon-editor v-model="editorContent"
                      @change="handleMavonChange"
                      @save="handleMavonSave"
        />
      </Row>
      <Row class="editor" v-if=" editorType === 'richeditor' ">
        <quill-editor v-model="editorContent"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </Row>
    </Card>
    <Divider><h3>请填写文章的其他信息</h3></Divider>
    <Card class="infobox">
      <Row :gutter="16">
        <i-col :span="7">
          <div style="width: 100%;height: 1px"></div>
        </i-col>
        <i-col :span="10">
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
              <Button type="primary" @click="handleSubmit('formValidate')">发布文章</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置表单</Button>
            </FormItem>
          </Form>
        </i-col>
        <i-col :span="7">
          <div style="width: 100%;height: 1px"></div>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import cookie from "../../store/cookie"
import {createArticle, getAlbums, getFirstCategories, getSecondCategories, getTags} from "../../api/api";

export default {
  name: 'home',
  data () {
    return {
      oldArticle: Object,
      isCollapsed: true,
      editorType: 'richeditor', //'markdown',
      editorContent: '',
      editorOption: {
        // some quill options
      },
      isInfo: false,
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
      categories1: [],
      categories2: [],
      albums: [ ],
      tags: [],
    }
  },
  methods: {
    handleMavonChange (value, render) {
      this.editorContent = value
      this.formValidate.content = render
    },
    handleMavonSave (value, render) {
      this.editorContent = value
      this.formValidate.content = render
    },
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    onEditorChange ({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.editorContent = html
      this.formValidate.content = html
    },
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
          // console.log(response.data)
        }
      ).catch((error) => {
        console.log(error)
      })
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
          let formData = new FormData()
          formData.append('user', userid)
          formData.append('title', this.formValidate.title)
          formData.append('brief', this.formValidate.brief)
          formData.append('album', this.formValidate.album)
          formData.append('category1', this.formValidate.category1)
          formData.append('category2', this.formValidate.category2)
          formData.append('cover', this.formValidate.cover) // 封面文件
          if (this.editorType==='markdown'){
            formData.append('content', this.formValidate.content)
          }
          if (this.editorType==='richeditor') {
            formData.append('content', this.editorContent)
          }
          // formData如何传递数组 https://blog.csdn.net/NAMECZ/article/details/84585709
          this.formValidate.tags.forEach((item) => { formData.append('tags', item) })
          createArticle(formData).then((response) => {
            this.$router.push({ name: 'article', params: {cat1id: response.data.category1, id: response.data.id} })
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
  computed: {
    quillEditor () {
      if (this.editorType === 'richeditor') {
        return this.$refs.myQuillEditor.quill
      } else {
        return null
      }
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    let userid = cookie.getCookie('userid') || ''
    if (userid !== '') {
      this.obtainCategories1({})
      this.obtainTags({})
      this.obtainAlbums({ user_id: userid })
      this.oldArticle = this.$route.params.article
      this.editorContent = this.oldArticle.content
      this.formValidate.title = this.oldArticle.title
      this.formValidate.brief = this.oldArticle.brief
      this.formValidate.album = this.oldArticle.album.id
      this.formValidate.category1 = this.oldArticle.category1.id
      this.obtainCategories2({ parent: this.formValidate.category1 })
      this.formValidate.category2 = this.oldArticle.category2.id
      this.formValidate.tags = this.oldArticle.tags
      this.formValidate.cover = this.oldArticle.cover
    }
  }
}
</script>

<style scoped>
  .mainbox {
    margin-top: 65px;
  }
  .blogbox {
    padding-top: 5px;
    min-height: 700px;
  }
</style>
