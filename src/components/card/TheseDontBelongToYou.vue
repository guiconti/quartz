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
        <h3 
          v-if="!counter" 
          class="subtitle"
        >
          {{ username }} used these don't belong to you and took {{ took }} from {{ target }}.
        </h3>
        <h3 
          v-else
          class="subtitle"
        >
          {{ username }} tried to rob from {{ target }} but got countered and lost {{ took }}.
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