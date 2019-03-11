<template>
  <div>
    <Tabs type="card">
      <TabPane label="我收到的消息" icon="logo-apple">
        <div style="margin-left: 16px">
          <Timeline pending>
            <TimelineItem v-for="(item, index) in recievedMessages" :key="item.id" color="red">
              <Icon type="logo-tux" slot="dot" v-if="item.user.username === 'admin'"></Icon>
              <Card>
                <p slot="title" v-if="item.user.username === 'admin'">
                  <Icon type="ios-contact" size="20"/>
                  来自：<span style="color:red"><strong>{{item.user.username}}</strong></span>
                </p>
                <p slot="title" v-if="item.user.username !== 'admin'">
                  <Icon type="ios-contact" size="20"/>
                  来自：<span style="color:forestgreen"><strong>{{item.user.username}}</strong></span>
                </p>
                <p slot="extra">
                  <Icon type="ios-clock-outline" size="20"/> <strong>{{item.add_time}}</strong>
                </p>
                <span class="content">{{item.message}}</span>
                <span style="float: right">
                <Button size="small" type="success" @click="handleMsgReply(item.user)">回复</Button>
                <Button type="error" size="small" style="margin-left: 16px"
                        @click="handleMsgDelete('reciever',item.id, index)">删除</Button>
              </span>
              </Card>
            </TimelineItem>
            <TimelineItem><a href="#">查看更多</a></TimelineItem>
          </Timeline>
        </div>
      </TabPane>
      <TabPane label="我发送的消息" icon="logo-windows">
        <div style="margin-left: 16px">
          <Timeline pending>
            <TimelineItem v-for="(item, index) in sendedMessages" :key="item.id" color="red">
              <Icon type="logo-tux" slot="dot" v-if="item.reciever.username === 'admin'"></Icon>
              <Card>
                <p slot="title" v-if="item.reciever.username === 'admin'">
                  <Icon type="ios-contact" size="20"/>
                  发给：<span style="color:red"><strong>{{item.reciever.username}}</strong></span>
                </p>
                <p slot="title" v-if="item.reciever.username !== 'admin'">
                  <Icon type="ios-contact" size="20"/>
                  发给：<span style="color:forestgreen"><strong>{{item.reciever.username}}</strong></span>
                </p>
                <p slot="extra">
                  <Icon type="ios-clock-outline" size="20"/> <strong>{{item.add_time}}</strong>
                </p>
                <span class="content">{{item.message}}</span>
                <span style="float: right">
                <Button size="small" type="success">回复</Button>
                <Button type="error" size="small" style="margin-left: 16px"
                        @click="handleMsgDelete('sender',item.id, index)">删除</Button>
              </span>
              </Card>
            </TimelineItem>
            <TimelineItem><a href="#">查看更多</a></TimelineItem>
          </Timeline>
        </div>
      </TabPane>
      <TabPane label="给管理员发消息" icon="logo-tux">
        xxxxxxxxxxxxxxxxxxxx
      </TabPane>
    </Tabs>
    <Modal
      v-model="openModal"
      title= "回复消息"
      @on-ok="ok"
      @on-cancel="cancel">
      <p style="font-size: 16px">消息接受者：{{reciever.username}}</p>
      <Input v-model="reciever.id" disabled/>
      <p style="font-size: 16px">输入消息内容：</p>
      <Input type="textarea" v-model="sendMsg"/>
    </Modal>
  </div>
</template>

<script>
  import {addUserMessage, delUserMessage, getUserAllMessage} from "../../api/api";
  import cookie from "../../store/cookie";

  export default {
    name: "user-message",
    data() {
      return {
        userId: -1,
        recievedMessages: [],
        sendedMessages: [],
        openModal: false,
        reciever: Object,
        sendMsg: ''
      }
    },
    methods: {
      obtainRecievedMessage (recieverId) {
        getUserAllMessage({params: {'reciever': recieverId} }).then(
          (response) => {
            this.recievedMessages = response.data
          }
        ).catch((error)=>{console.log(error)})
      },
      obtainSendedMessages () {
        getUserAllMessage().then(
          (response) => {
            this.sendedMessages = response.data
          }
        ).catch((error)=>{console.log(error)})
      },
      handleMsgDelete(kind, msgId, index) {
        let params = {'messageId': msgId}
        if (kind==='reciever'){
          params = {'messageId': msgId, 'reciever':this.userId}
        }
        // console.log(params)
        delUserMessage(params).then(
          (response) => {
            this.$Message.success("消息已删除！")
            if (kind==='reciever') {
              this.recievedMessages.splice(index, 1)
            } else {
              this.sendedMessages.splice(index, 1)
            }
          }
        ).catch((error)=>{console.log(error)})
      },
      handleMsgReply (reciever) {
        this.openModal = true
        this.reciever = reciever
      },
      ok () {
        if (this.sendMsg !== '') {
          addUserMessage({
            'reciever': this.reciever.id,
            'message': this.sendMsg}).then(
            (response) => {
              this.$Message.success('消息发送成功');
              this.reciever = Object
              this.sendMsg = ''
            }
          )
        } else {
          this.$Message.error('消息内容不能为空');
        }
      },
      cancel () {
        this.$Message.info('取消发送');
      }
    },
    created () {
      this.userId = cookie.getCookie('userid')
      if (this.userId !== '') {
        this.obtainSendedMessages()
        this.obtainRecievedMessage(this.userId)
      }
    }
  }
</script>

<style scoped>
  .time{
    font-size: 14px;
    font-weight: bold;
  }
  .content{
    padding-left: 16px;
  }
</style>
