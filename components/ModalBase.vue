<template>
  <div class="modal" v-show="isShow">
    <div class="modal-background" @click.self="close">
      <div class="modal-box" @click.self="close">
        <div class="box">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    }
  },
  methods: {
    close() {
      console.error('close')
      this.$emit('close')
    },
  }
}
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.modal-box {
  width: 600px;
  height: 100%;
  margin: auto;
  position:relative
}

.box {
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 300px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.9);
  border: 2px solid #ccc;
}
</style>