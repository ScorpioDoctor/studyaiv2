<template>
  <Modal
    v-model="isShow"
    title="修改文章基本信息"
    @on-ok="ok"
    @on-cancel="cancel">
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
  </Modal>
</template>

<script>
export default {
  name: "article-info-edit",
  props: {
    categories1: { type:Array },
    categories2: { type:Array },
    albums: { type:Array },
    tags: { type:Array },
    article: { type:Object },
  },
  data () {
    return {
      isShow: true,
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
    ok () {
      this.$emit('on-close', { status: 'ok' })
      this.isShow = false
    },
    cancel () {
      this.$emit('on-close', { status: 'cancel' })
      this.isShow = false
    },
    fillForm () {
      this.formValidate.title = this.article.title
      this.formValidate.brief = this.article.brief
      // this.formValidate.album = this.article.album.id
      // this.formValidate.category1.value = this.article.categories1.id
      // this.formValidate.category2.value = this.article.categories2.id
      // this.formValidate.content = this.article.content
    },
    handleBeforeUpload (file) {
      this.formValidate.cover = file;
      return false;
    },
    handleCategory1Select () {
      // this.obtainCategories2({ parent: this.formValidate.category1 })
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
    this.fillForm()
  }
}
</script>

<style scoped>

</style>
