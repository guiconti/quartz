<template>
  <v-container>
    <v-layout 
      row 
      align-center
    >
      <v-flex xs1>
        <v-checkbox
          :disabled="!enabled"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="from"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="from"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="from"
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
        <h3> 2X </h3>
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="to"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Crystal from './Crystal';

export default {
  name: 'CrystalCombo1',
  components: {
    appCrystal: Crystal
  },
  props: {
    from: {
      type: String,
      required: false,
      default: ''
    },
    to: {
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
  computed: {
    enabled: function() {
      for (let i = 0; i < this.crystals.length - 1; i++) {
        if (this.crystals[i].amount >= 3)
          return true;
      }
      return false;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container {
    padding: 0px !important
  }
</style>