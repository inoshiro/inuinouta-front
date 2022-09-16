export default ({ store }, inject) => {
  inject('utils', {
    scrollToPlayingSong: () => {
      // 再生中or停止中の曲の要素を取得
      const playing = store.getters['controller/playing']
      const pausing = store.getters['controller/pausing']
      const targetSong = playing || pausing
      const target = document.getElementById('song-row-' + targetSong.id)
      const targetRect = target.getBoundingClientRect()

      // 動画エリアの表示/非表示バー
      const showVideo = store.getters['global/showVideoArea']
      const barId = showVideo ? 'show-hide-bar-open' : 'show-hide-bar-close'
      const bar = document.getElementById(barId)
      const barRect = bar.getBoundingClientRect()

      // スクロール一の計算
      const posY = window.pageYOffset + targetRect.top
      const scrollTo = posY - barRect.top - barRect.height

      window.scrollTo({ top: scrollTo, left: 0, behavior: 'smooth' })
    },
  })
}
