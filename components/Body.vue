<template>
  <div class="body">
    <navigation-menu />
    <song-list />
  </div>
</template>

<script>
import NavigationMenu from './navigation/Menu.vue'
import SongList from './SongList.vue'
export default {
  components: { NavigationMenu, SongList },
}
</script>
, SongList

<style>
.body {
  padding-top: 45px;
}
</style>
