export default ({}, inject) => {
  inject('s3_image', (path) => {
    const s3_base = 'https://inuinouta.s3.ap-northeast-1.amazonaws.com/images'
    return s3_base + path
  })
}
