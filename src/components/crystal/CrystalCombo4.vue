<template>
  <v-container>
    <v-layout 
      row 
      align-center
    >
      <v-flex xs1>
        <v-checkbox
          v-model="selected"
          :disabled="!enabled"
          color="blue"
          @click.stop="select"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="fromFirst"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="fromSecond"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="fromThird"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="fromForth"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="fromFifth"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="fromSixth"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex 
        xs1
        class="text-xs-center"
      >
        <v-icon>arrow_forward</v-icon>
      </v-flex>
      <v-flex 
        xs1
        class="text-xs-center"
      >
        <h3> 12 </h3>
      </v-flex>
      <v-flex 
        xs1
        class="text-xs-center"
      >
        <v-icon color="yellow lighten-1">monetization_on</v-icon>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Crystal from './Crystal';
import EventBus from '../../utils/event-bus';

export default {
  name: 'CrystalCombo4',
  components: {
    appCrystal: Crystal
  },
  props: {
    fromFirst: {
      type: String,
      required: false,
      default: ''
    },
    fromSecond: {
      type: String,
      required: false,
      default: ''
    },
    fromThird: {
      type: String,
      required: false,
      default: ''
    },
    fromForth: {
      type: String,
      required: false,
      default: ''
    },
    fromFifth: {
      type: String,
      required: false,
      default: ''
    },
    fromSixth: {
      type: String,
      required: false,
      default: ''
    },
    crystals: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      selected: false
    }
  },
  computed: {
    enabled: function() {
      let amountOfDifferentCrystals = 0;
      for (let i = 0; i < this.crystals.length - 1; i++) {
        if (this.crystals[i].amount > 0)
          amountOfDifferentCrystals++;
      }
      return amountOfDifferentCrystals >= 5;
    }
  },
  created() {
    EventBus.$on('combo-selected', componentName => {
      if (componentName !== this.$options.name)
        this.selected = false;
    });
  },
  methods: {
    select() {
      EventBus.$emit('combo-selected', this.$options.name);
      const comboData = {
        type: 3
      };
      EventBus.$emit('combo-filled', comboData);
      this.selected = !this.selected;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container {
    padding: 0px !important
  }
</style>