<template>
  <v-layout>
    <v-flex xs4>
      <v-icon :color="this.getCrystalColor()(this.name)">brightness_1</v-icon> {{amount}}
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Crystal',
  props: {
    name: String,
    amount: Number
  },
  methods: {
    ...mapGetters('crystal', {
      getCrystalColor: 'getCrystalColor'
    })
  }
}
</script>
