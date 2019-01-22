<template>
  <v-layout column>
    <v-flex 
      xs4 
      align-center
    >
      <div class="text-xs-center">
        <app-crystal-icon
          :size="50"
          :color="getCrystalColor()(name)"
        />
      </div>
    </v-flex>
    <v-flex 
      xs4 
      align-center
    >
      <div class="text-xs-right">
        {{ amount }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import CrystalIcon from '../icons/CrystalIcon';

export default {
  name: 'Crystal',
  components: {
    appCrystalIcon: CrystalIcon
  },
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    amount: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    ...mapGetters('crystal', {
      getCrystalColor: 'getCrystalColor'
    })
  }
}
</script>
