<template>
  <div>
    <Card>
      <Row>
        <i-col :span="3">
          <Button v-if="!isCreate" @click="isCreate=true">新建专辑</Button>
          <Button v-if="isCreate" @click="isCreate=false">取消新建</Button>
        </i-col>
        <i-col :span="10" v-if="isCreate">
          <Form :model="formItem" :label-width="80">
            <FormItem label="专辑名称">
              <Input v-model="formItem.input" placeholder="Enter something..."></Input>
            </FormItem>
            <Row>
              <i-col :span="8">
                <FormItem label="一级类目">
                  <Select v-model="formItem.select1">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col :span="8">
                <FormItem label="二级类目">
                  <Select v-model="formItem.select2">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
            <FormItem label="公开/私有">
              <i-switch v-model="formItem.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
            <FormItem label="专辑简介">
              <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
              <Button type="primary">Submit</Button>
              <Button style="margin-left: 8px">Cancel</Button>
            </FormItem>
          </Form>
        </i-col>
        <i-col :span="11">
          <div style="width: 100%; height: 1px"></div>
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
import { getAlbums } from '../../api/api'
import cookie from '../../store/cookie'

export default {
  name: 'UserAlbums',
  data () {
    return {
      isCreate: false,
      formItem: {
        input: '',
        select1: '',
        select2: '',
        switch: true,
        textarea: ''
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
            return row.category1.name.indexOf(value) > -1;
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
      albums: [ ],
      totalCount: 0,
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: '' // 第一列输入框，当前聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
    }
  },
  methods: {
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
      this.editIndex = -1;
    }
  },
  created () {
    var userid = cookie.getCookie('userid') || ''
    if (userid !== '') {
      this.obtainAlbums({ user_id: userid })
    }
  }
}
</script>

<style scoped>

</style>
