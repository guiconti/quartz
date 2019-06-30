<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ username }} used Come closer
        </v-card-title>
        <v-card-text>
          Changed his/hers {{ givenCrystal }} for {{ target }}'s {{ takenCrystal }}
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
  </div>
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