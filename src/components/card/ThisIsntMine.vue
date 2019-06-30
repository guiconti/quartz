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
          {{ username }} used This isn't mine and sent an Obsidian to {{ target }}.
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
  name: 'ThisIsntMine',
  data() {
    return {
      dialog: false,
      username: '',
      target: '',
      keptCrystal: '',
    };
  },
  sockets: {
    thisIsntMine: function(data) {
      this.username = data.player.username;
      this.target = data.target.username;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.target = '';
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