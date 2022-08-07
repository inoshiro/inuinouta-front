<template>
  <div class="playlist" v-if="playlist">
    <ul>
      <li v-for="(song_id, index) in playlist.list" :key="song_id">
        <song-row :song_id="song_id" :position="index" />
      </li>
    </ul>
  </div>
</template>

<script>
import SongRow from './SongRow.vue'
export default {
  components: { SongRow },
  props: {
    playlist: {
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.playlist {
  background-color: #000;
  padding-bottom: 80px;
}
</style>
