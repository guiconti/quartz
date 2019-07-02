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
      <div
        class="text-xs-center"
      >
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <div class="font-weight-bold">{{ amount }}</div>
            <div v-if="value > -1" class="text-xs-center">
              {{ value }}<v-icon small color="primary">monetization_on</v-icon> each
            </div>
          </v-flex>
        </v-layout>
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
    },
    centerText: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Number,
      required: false,
      default: -1
    }
  },
  methods: {
    ...mapGetters('crystal', {
      getCrystalColor: 'getCrystalColor'
    })
  }
}
</script>
