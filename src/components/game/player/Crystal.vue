<template>
  <v-layout column>
    <v-flex xs4 align-center>
      <div class="text-xs-center">
        <v-icon :color="this.getCrystalColor()(this.name)">brightness_1</v-icon>
      </div>
    </v-flex>
    <v-flex xs4 align-center>
      <div class="text-xs-center">
        {{amount}}
      </div>
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
