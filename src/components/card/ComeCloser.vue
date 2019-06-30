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
          color="secondary"
          @click="dialog = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ username }} used come closer and changed his/hers {{ givenCrystal }} for {{ target }}'s {{ takenCrystal }}
        </v-toolbar-title>
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
  name: 'ComeCloser',
  data() {
    return {
      dialog: false,
      username: '',
      target: '',
      givenCrystal: '',
      takenCrystal: ''
    };
  },
  sockets: {
    comeCloser: function(data) {
      this.username = data.player.username;
      this.target = data.from.username;
      this.givenCrystal = data.crystals.given;
      this.takenCrystal = data.crystals.taken;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.target = '';
        this.givenCrystal = '';
        this.takenCrystal = '';
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