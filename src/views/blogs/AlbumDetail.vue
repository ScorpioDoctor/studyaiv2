<template>
  <div class="main">
    <Row class="infos">
      <i-col :span="3">
        <div style="height: 1px;width: 100%"></div>
      </i-col>
      <i-col :span="18">
        <Card>
          <h2>{{album.name}}</h2>
        </Card>
      </i-col>
      <i-col :span="3">
        <div style="height: 1px;width: 100%"></div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { getAlbums } from '../../api/api'

export default {
  name: 'AlbumDetail',
  data () {
    return {
      album: Object
    }
  },
  methods: {
    obtainAlbum (albumId) {
      getAlbums({ id: albumId }).then(
        (response) => {
          console.log(response.data)
          this.album = response.data
        }
      ).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    var albumId = this.$route.params.id
    this.obtainAlbum(albumId)
  }
}
</script>

<style scoped>
  .main {
    /*margin-top: 2px;*/
  }
</style>
