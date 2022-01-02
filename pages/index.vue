<template>
  <div>
    <Header />
    <Body />
  </div>
</template>

<script>
export default {
  async asyncData({ store, $axios }) {
    const videos = await $axios.$get('/api/videos/?sort[]=-published_at')
    const songs = await $axios.$get(
      '/api/songs/?sort[]=-video.published_at&sort[]=start_at'
    )
    store.commit('contents/setVideos', videos.videos)
    store.commit('contents/setSongs', songs.songs)

    console.log(store.getters['contents/videos'])
    console.log(store.getters['contents/songs'])
  },
}
</script>
