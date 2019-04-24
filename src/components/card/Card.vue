<template>
  <img :src="image">
</template>

<script>
export default {
  name: 'Card',
  components: {},
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    action: {
      type: String,
      required: false,
      default: ''
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: Number,
      required: false,
      default: 0
    }
  }
};
</script>
