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
        {{ username }} used This isn't mine
      </v-card-title>
      <v-card-text>
        Sent an Obsidian to {{ target }}
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