<template>
  <v-container>
    <v-layout 
      row 
      wrap
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
    <v-layout
      v-if="selected"
      row
      wrap
      align-center
    >
      <v-flex 
        xs3
        style="padding-right: 20px; padding-left: 20px;"
      >
        <v-select
          v-model="fromSelected"
          :items="fromCandidates"
          @change="change"
        />
      </v-flex>
      <v-flex 
        xs1
        class="text-xs-center"
      >
        <v-icon>arrow_forward</v-icon>
      </v-flex>
      <v-flex 
        xs3
        style="padding-right: 20px; padding-left: 20px;"
      >
        <v-select
          v-model="toSelected"
          :items="toCandidates"
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
  data() {
    return {
      selected: false,
      fromCandidates: [],
      toCandidates: [],
      fromSelected: null,
      toSelected: null
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
  },
  methods: {
    select() {
      this.fromCandidates = [];
      this.toCandidates = [];
      for (let i = 0; i < this.crystals.length - 1; i++) {
        if (this.crystals[i].amount >= 3) {
          this.fromCandidates.push(this.crystals[i].name);
          this.toCandidates.push(this.crystals[i].name);
        } else if (this.crystals[i].amount > 0) {
          this.toCandidates.push(this.crystals[i].name);
        }
      }
      this.selected = !this.selected;
    },
    change(currentSelected) {
      const index = this.toCandidates.indexOf(currentSelected);
      this.toCandidates.splice(index, 1);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container {
    padding: 0px !important
  }
</style>