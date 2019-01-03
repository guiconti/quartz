<template>
  <v-layout>
    <v-flex xs2>
      {{name}} - {{amount}}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Crystal',
  props: {
    name: String,
    amount: Number
  }
}
</script>
