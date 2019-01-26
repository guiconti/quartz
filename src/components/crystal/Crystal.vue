<template>
  <v-layout column>
    <v-flex 
      xs4 
      align-center
    >
      <div class="text-xs-center">
        <app-crystal-icon
          :size="size"
          :color="getCrystalColor()(name)"
        />
      </div>
    </v-flex>
    <v-flex
      v-if="!onlyImage"
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
    size: {
      type: Number,
      required: false,
      default: 50
    },
    amount: {
      type: Number,
      required: false,
      default: 0
    },
    onlyImage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    ...mapGetters('crystal', {
      getCrystalColor: 'getCrystalColor'
    })
  }
}
</script>
