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
      <v-flex xs2 md1>
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
          :name="toFirst"
          :amount="0"
          :only-image="true"
        />
      </v-flex>
      <v-flex xs1>
        <app-crystal
          :name="toSecond"
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
        xs4
        style="padding-right: 20px; padding-left: 20px;"
      >
        <v-select
          v-model="fromSelected"
          :items="fromCandidates"
          @change="changeSelected"
        />
      </v-flex>
      <v-flex 
        xs2
        class="text-xs-center"
      >
        <v-icon>arrow_forward</v-icon>
      </v-flex>
      <v-flex 
        xs3
        style="padding-right: 20px; padding-left: 20px;"
      >
        <v-select
          v-model="toSelectedFirst"
          :items="toCandidatesFirst"
          @change="changeSelectedFirst"
        />
      </v-flex>
      <v-flex 
        xs3
        style="padding-right: 20px; padding-left: 20px;"
      >
        <v-select
          v-model="toSelectedSecond"
          :items="toCandidatesSecond"
          @change="changeSelectedSecond"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Crystal from './Crystal';
import EventBus from '../../utils/event-bus';

export default {
  name: 'CrystalCombo2',
  components: {
    appCrystal: Crystal
  },
  props: {
    from: {
      type: String,
      required: false,
      default: ''
    },
    toFirst: {
      type: String,
      required: false,
      default: ''
    },
    toSecond: {
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
      toCandidatesFirst: [],
      toCandidatesSecond: [],
      fromSelected: null,
      toSelectedFirst: null,
      toSelectedSecond: null,
    }
  },
  computed: {
    enabled: function() {
      for (let i = 0; i < this.crystals.length - 1; i++) {
        if (this.crystals[i].amount >= 4)
          return true;
      }
      return false;
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
        type: 1,
        conversion: {
          from: this.fromSelected,
          toFirst: this.toSelectedFirst,
          toSecond: this.toSelectedSecond
        }
      };
      console.log(JSON.stringify(comboData));
      EventBus.$emit('combo-filled', comboData);
      this.fillChoices();
      this.selected = !this.selected;
    },
    fillChoices() {
      this.fromCandidates = [];
      this.toCandidatesFirst = [];
      this.toCandidatesSecond = [];
      for (let i = 0; i < this.crystals.length - 1; i++) {
        if (this.crystals[i].amount >= 4) {
          this.fromCandidates.push(this.crystals[i].name);
          this.toCandidatesFirst.push(this.crystals[i].name);
          this.toCandidatesSecond.push(this.crystals[i].name);
        } else if (this.crystals[i].amount > 0) {
          this.toCandidatesFirst.push(this.crystals[i].name);
          this.toCandidatesSecond.push(this.crystals[i].name);
        }
      }
    },
    changeSelected(currentSelected) {
      this.fillChoices();
      this.fromSelected = currentSelected;
      this.toSelectedFirst = this.fromSelected == this.toSelectedFirst ? null : this.toSelectedFirst;
      this.toSelectedSecond = this.fromSelected == this.toSelectedSecond ? null : this.toSelectedSecond;
      let indexFirst = this.toCandidatesFirst.indexOf(currentSelected);
      let indexSecond = this.toCandidatesSecond.indexOf(currentSelected);
      if (indexFirst >= 0)
        this.toCandidatesFirst.splice(indexFirst, 1);
      if (indexSecond >= 0)
        this.toCandidatesSecond.splice(indexSecond, 1);
      indexFirst = this.toCandidatesFirst.indexOf(this.toSelectedSecond);
      indexSecond = this.toCandidatesSecond.indexOf(this.toSelectedFirst);
      if (indexFirst >= 0)
        this.toCandidatesFirst.splice(indexFirst, 1);
      if (indexSecond >= 0)
        this.toCandidatesSecond.splice(indexSecond, 1);
      const comboData = {
        type: 1,
        conversion: {
          from: this.fromSelected,
          toFirst: this.toSelectedFirst,
          toSecond: this.toSelectedSecond
        }
      };
      EventBus.$emit('combo-filled', comboData);
    },
    changeSelectedFirst(currentSelected) {
      this.fillChoices();
      this.toSelectedFirst = currentSelected;
      let indexSecond = this.toCandidatesSecond.indexOf(currentSelected);
      if (indexSecond >= 0)
        this.toCandidatesSecond.splice(indexSecond, 1);
      let indexFirst = this.toCandidatesFirst.indexOf(this.fromSelected);
      indexSecond = this.toCandidatesSecond.indexOf(this.fromSelected);
      if (indexFirst >= 0)
        this.toCandidatesFirst.splice(indexFirst, 1);
      if (indexSecond >= 0)
        this.toCandidatesSecond.splice(indexSecond, 1);
      indexFirst = this.toCandidatesFirst.indexOf(this.toSelectedSecond);
      if (indexFirst >= 0)
        this.toCandidatesFirst.splice(indexFirst, 1);
      const comboData = {
        type: 1,
        conversion: {
          from: this.fromSelected,
          toFirst: this.toSelectedFirst,
          toSecond: this.toSelectedSecond
        }
      };
      EventBus.$emit('combo-filled', comboData);
    },
    changeSelectedSecond(currentSelected) {
      this.fillChoices();
      this.toSelectedSecond = currentSelected;
      let indexFirst = this.toCandidatesFirst.indexOf(currentSelected);
      if (indexFirst >= 0)
        this.toCandidatesFirst.splice(indexFirst, 1);
      indexFirst = this.toCandidatesFirst.indexOf(this.fromSelected);
      let indexSecond = this.toCandidatesSecond.indexOf(this.fromSelected);
      if (indexFirst >= 0)
        this.toCandidatesFirst.splice(indexFirst, 1);
      if (indexSecond >= 0)
        this.toCandidatesSecond.splice(indexSecond, 1);
      indexSecond = this.toCandidatesSecond.indexOf(this.toSelectedFirst);
      if (indexSecond >= 0)
        this.toCandidatesSecond.splice(indexSecond, 1);
      const comboData = {
        type: 1,
        conversion: {
          from: this.fromSelected,
          toFirst: this.toSelectedFirst,
          toSecond: this.toSelectedSecond
        }
      };
      EventBus.$emit('combo-filled', comboData);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container {
    padding: 0px !important
  }
</style>