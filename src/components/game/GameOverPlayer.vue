<template>
  <v-card flat>
     <v-card-text class="no-padding-bottom">
      <h3 class="headline">
        {{ position }} - {{ name }}
        <v-icon color="primary">monetization_on</v-icon>
        {{ money }}
      </h3>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="show = !show">
        Summary <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        <v-layout row wrap>
          <v-flex
            v-for="crystal in summary.crystals"
            :key="crystal.name" 
            xs2
            md1
          >
            <app-crystal
              :name="crystal.name"
              :amount="crystal.amount"
            />
          </v-flex>
          <v-flex xs12>
            <h5 class="subheading font-weight-bold">
              Amount of cards played: {{ summary.cards.reduce((a, b) => a + b.amount, 0) }}
            </h5>
            <h5 class="subheading font-weight-bold">
              Total explosions: {{ summary.explosions }}
            </h5>
            <h5 class="subheading font-weight-bold">
              Amount of times the mine was closed: {{ summary.closes }}
            </h5>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
import Crystal from '../crystal/Crystal';

export default {
  name: 'GameOverPlayer',
  props: {
    position: {
      type: Number,
      required: false,
      default: 0,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    money: {
      type: Number,
      required: false,
      default: 0,
    },
    summary: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  components: {
    appCrystal: Crystal,
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style lang="stylus" scoped>
  .no-padding-bottom {
    padding-bottom: 0px !important
  }
</style>
