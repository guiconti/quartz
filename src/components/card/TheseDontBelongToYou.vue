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
        {{ username }} used These don't belong to you
      </v-card-title>
      <v-card-text v-if="!counter">
        Took {{ took }} from {{ target }}.
      </v-card-text>
      <v-card-text v-else>
        Tried to rob from {{ target }} but got countered and lost {{ took }}.
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
  name: 'TheseDontBelongToYou',
  data() {
    return {
      dialog: false,
      username: '',
      target: '',
      took: '',
      counter: false,
    };
  },
  sockets: {
    theseDontBelongToYou: function(data) {
      this.username = data.player.username;
      this.target = data.from.username;
      this.took = data.took;
      this.counter = data.counter;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.keptCrystal = '';
        this.took = '';
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