<template>
  <div class="mainbox">
    <Card class="blogbox">
      <Row>
        <i-col span="24">
          <Row>
            <span>请选择编辑器类型:  </span>
            <RadioGroup v-model="editorType">
              <Radio label="markdown">MarkDown编辑器</Radio>
              <Radio label="richeditor">富文本编辑器</Radio>
            </RadioGroup>
          </Row>
          <Divider>我思故我在，请开始您的创作吧</Divider>
          <Row class="editor" v-if=" editorType === 'markdown' ">
            <mavon-editor v-model="editorContent"/>
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
        </i-col>
      </Row>
      <Divider>请填写文章的其他信息</Divider>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      isCollapsed: true,
      editorType: 'richeditor',
      editorContent: '',
      editorOption: {
        // some quill options
      }
    }
  },
  methods: {
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
    }, 1300)
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
