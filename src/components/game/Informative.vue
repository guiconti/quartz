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
        <v-card-text>
        <h3 class="subtitle">
          {{ message }}
        </h3>
        </v-card-text>
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
  name: 'Informative',
  data() {
    return {
      dialog: false,
      message: ''
    };
  },
  sockets: {
    informative: function(data) {
      this.message = data.message;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.message = '';
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