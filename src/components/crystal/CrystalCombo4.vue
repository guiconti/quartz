<template>
  <v-container>
    <v-layout 
      row 
      align-center
    >
      <v-flex xs1>
        <v-radio/>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container {
    padding: 0px !important
  }
</style>