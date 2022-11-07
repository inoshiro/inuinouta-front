<template>
  <div class="header">
    <div class="blank"></div>
    <div class="site-title"><h1>いぬいのうた</h1></div>
    <div class="account">
      <img :src="$s3_image('/icons/default_user.svg')" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  width: 100%;
  background-color: rgb(46, 45, 53);

  max-width: 600px;
  inset: 0;
  margin: 0 auto;
  z-index: 2;

  .blank {
    flex: none;
    width: 55px;
    height: 100%;
  }

  .site-title h1 {
    flex: auto;
    margin: 0;
    padding: 4px;
    color: rgb(223, 223, 223);
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 1.5rem;
  }

  .account {
    flex: none;
    width: 55px;
    height: 100%;
    padding: 10px 10px;

    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
