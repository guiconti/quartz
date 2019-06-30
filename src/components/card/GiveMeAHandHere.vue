<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ username }} used Give me a hand here
      </v-card-title>
      <v-card-text v-if="!counter">
        To make {{ target }} mine two crystals. {{ username }} got {{ took }} and {{ target }} got {{ given }}.
      </v-card-text>
      <v-card-text v-else>
        To make {{ target }} mine two crystals. But {{ target }} was on a break and no crystals were taken.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
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