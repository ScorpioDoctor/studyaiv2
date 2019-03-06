<template>
  <div>
    <Card>
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
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: '' // 第一列输入框，当前聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
    }
  },
  methods: {
    obtainAlbums (queryParams) {
      getAlbums({ params: queryParams }).then(
        (response) => {
          this.albums = response.data.results
          console.log(response.data)
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
