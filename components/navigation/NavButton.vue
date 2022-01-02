<template>
  <button @click="click($event)" :class="className">{{ label }}</button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
  },
  methods: {
    click(event) {
      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'center',
      })
      this.$emit('click')
    },
  },
  computed: {
    className() {
      const class_name = 'nav-button'
      if (this.name === this.$store.getters['global/activeNav']) {
        return class_name + '-active'
      }
      return class_name
    },
  },
}
</script>

<style scoped>
.nav-button {
  padding: 5px 10px;
  margin: 0px 5px;
  font-size: 0.8rem;
  font-family: 'Kosugi Maru', sans-serif;
  color: rgb(143, 143, 143);
  background-color: unset;
  border: none;
  border-bottom: 5px solid #000;
  transition: 0.8s;
}

.nav-button-active {
  padding: 5px 10px;
  margin: 0px 5px;
  font-size: 0.8rem;
  font-family: 'Kosugi Maru', sans-serif;
  color: rgb(223, 223, 223);
  background-color: unset;
  border: none;
  border-bottom: 5px solid #9d3757;
  transition: 0.8s;
}
</style>
