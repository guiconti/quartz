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
        <v-card-text v-if="url === ''">
          {{ message }}
        </v-card-text>
        <v-card-text>
        <v-img
          :src="url"
          class="grey lighten-2"
        />
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
  name: 'Informative',
  data() {
    return {
      dialog: false,
      title: '',
      message: '',
      url: '',
    };
  },
  sockets: {
    informative: function(data) {
      console.log(data);
      this.title = data.title;
      this.message = data.message;
      this.url = data.url;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.title = ''
        this.message = '';
        this.url = '';
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