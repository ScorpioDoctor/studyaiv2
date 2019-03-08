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
        <mavon-editor v-model="editorContent" @change="handleMavonChange"/>
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
import highlightJs from 'highlight.js'
import marked from 'marked'
import {createArticle, getAlbums, getFirstCategories, getSecondCategories, getTags} from "../../api/api";

export default {
  name: 'home',
  data () {
    return {
      isCollapsed: true,
      editorType: 'markdown', //'richeditor',
      editorContent: '',
      editorOption: {
        // some quill options
      },
      isInfo: false,
      formValidate: {
        title: '',
        category1: '',
        category2: '',
        album: 1,
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
      // console.log(value)
      // console.log(render)
      this.editorContent = render;
      console.log(this.editorContent)
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.editorContent = html
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
          console.log(this.editorContent)
          formData.append('content', this.editorContent)
          // formData如何传递数组 https://blog.csdn.net/NAMECZ/article/details/84585709
          this.formValidate.tags.forEach((item) => { formData.append('tags', item) })

          createArticle(formData).then((response) => {
            // this.$Message.success('Success!')
            console.log(response.data)
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
    }
    console.log('this is current quill instance object', this.quillEditor)
    setTimeout(() => {
      if (this.editorType === 'richeditor') {
        this.editorContent = `<h1 class="ql-align-center">
                      <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                      </h1>
                      <p><br></p>
                      <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                      <p><br></p>
                      <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                      <p><br></p>
                      <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                      <p><br></p>
                      <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                      <p><br></p>
                      <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                      <p><br></p>
                      <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                      <p><br></p>
                      <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                      <p><br></p>
                      <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="http://724.169pp.net/169mm/201812/046/2.jpg" height="512" width="800"></iframe>
                      <p><br></p>
                      <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                      <p><br></p>
                      <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                      <p><br></p>
                      <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
                      <p><br></p>
                      <iframe height=480 width=640 src='http://player.youku.com/embed/XMzc5NTczMzcwNA==' class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" ></iframe>                        <p><br></p>
                      `
      } else {
      }
    }, 300)
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
