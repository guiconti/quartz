<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          v-if="title && title !== ''"
          class="headline grey lighten-2"
          primary-title
        >
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="secondary"
              flat
              @click="dialog = false"
            >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Informative',
  data() {
    return {
      dialog: false,
      title: '',
      message: ''
    };
  },
  sockets: {
    informative: function(data) {
      this.title = data.title;
      this.message = data.message;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.title = ''
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