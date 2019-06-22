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
        <v-toolbar-title>
          {{ username }} used crystal what crystal and kept his/hers {{ keptCrystal }} safe until the end of the day.
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
  name: 'CrystalWhatCrystal',
  data() {
    return {
      dialog: false,
      username: '',
      keptCrystal: '',
    };
  },
  sockets: {
    crystalWhatCrystal: function(data) {
      this.username = data.player.username;
      this.keptCrystal = data.crystal;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.keptCrystal = '';
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