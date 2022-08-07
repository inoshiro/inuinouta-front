export default async ({ store, $axios }, inject) => {
  const videos = await $axios.$get('/api/videos/?sort[]=-published_at')
  const songs = await $axios.$get(
    '/api/songs/?sort[]=-video.published_at&sort[]=start_at'
  )
  store.commit('contents/setVideos', videos.videos)
  store.commit('contents/setSongs', songs.songs)
  inject('init_video', videos.videos[0])
}
