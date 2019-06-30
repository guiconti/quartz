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
        {{ username }} used Crystal what crystal?
      </v-card-title>
      <v-card-text>
        Kept his/hers {{ keptCrystal }} safe until the end of the day
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