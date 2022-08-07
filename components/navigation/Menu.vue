<template>
  <div>
    <div class="submenu">
      <nav-button
        @click="clickNav('default')"
        name="default"
        label="全ての楽曲"
      />
      <!-- <nav-button
        @click="clickNav('playlist')"
        name="playlist"
        label="プレイリスト"
      /> -->
      <nav-button
        @click="clickNav('original')"
        name="original"
        label="オリジナル曲"
      />
      <!-- <nav-button
        @click="clickNav('artist')"
        name="artist"
        label="アーティスト別"
      /> -->
      <nav-button @click="clickNav('video')" name="video" label="歌動画" />
      <!-- <nav-button @click="clickNav('stream')" name="stream" label="歌配信" /> -->
    </div>
  </div>
</template>

<script>
import NavButton from './NavButton.vue'
export default {
  components: { NavButton },
  methods: {
    clickNav(val) {
      this.$store.commit('global/setActiveNav', val)
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
  max-width: 800px;
  inset: 0;
  margin: 45px auto;
  padding: 5px;
  background-color: #000;
  white-space: nowrap;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  z-index: 2;
}
</style>
