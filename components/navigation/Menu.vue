<template>
  <div>
    <div class="submenu">
      <nav-button @click="clickNav('all')" name="all" label="全ての楽曲" />
      <nav-button
        @click="clickNav('playlist')"
        name="playlist"
        label="プレイリスト"
      />
      <nav-button
        @click="clickNav('original')"
        name="original"
        label="オリジナル曲"
      />
      <nav-button
        @click="clickNav('artist')"
        name="artist"
        label="アーティスト別"
      />
      <nav-button @click="clickNav('video')" name="video" label="歌動画" />
      <nav-button @click="clickNav('stream')" name="stream" label="歌配信" />
    </div>
  </div>
</template>

<script>
import NavButton from './NavButton.vue'
export default {
  components: { NavButton },
  methods: {
    clickNav(val) {
      console.log('click nav:', val)
      this.$store.commit('global/setActiveNav', val)
      console.log(this.$store.getters['global/activeNav'])
      this.$emit('click-nav', val)
    },
  },
}
</script>

<style lang="scss">
.submenu {
  position: fixed;
  display: flex;
  height: 40px;
  width: 100%;
  padding: 5px 5px 0 5px;
  background-color: #000;
  white-space: nowrap;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
