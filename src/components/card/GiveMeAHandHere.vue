<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-btn
          flat 
          icon 
          @click="dialog = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <h3 class="subtitle" v-if="!counter">
          {{ username }} used Give me a hand here to make {{ target }} mine two crystals.
          {{ username }} got {{ took }} and {{ target }} got {{ given }}.
        </h3>
        <h3 v-else>
          {{ username }} usedGive me a hand here to make {{ target }} mine two crystals.
          But {{ target }} was on a break and no crystals were taken.
        </h3>
      </v-toolbar>
      <v-btn
        @click="dialog = false"
      >
        Close
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'GiveMeAHandHere',
  data() {
    return {
      dialog: false,
      username: '',
      target: '',
      took: '',
      given: '',
      counter: false,
    };
  },
  sockets: {
    giveMeAHandHere: function(data) {
      this.username = data.player.username;
      this.target = data.target.username;
      this.took = data.took;
      this.given = data.given;
      this.counter = data.counter;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.target = '';
        this.took = '';
        this.given = '';
        this.counter = false;
      }
    }
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>