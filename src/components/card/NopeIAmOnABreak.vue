<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ attacker }} used Give me a hand here
      </v-card-title>
      <v-card-text>
        And tried to make you mine two crystals for him/her.
        You have Nope i am on a break and is able to defend youself by not mining anything.
        If you don't want to use your card just click "Cancel".
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          :loading="loading" 
          color="secondary"
          @click="defend(true)"
        >
          Defend
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading" 
          @click="defend(false)"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'NopeIAmOnABreak',
  data() {
    return {
      loading: false,
      attacker: null,
      dialog: false,
    }
  },
  sockets: {
    nopeIAmOnABreak: function(data) {
      this.attacker = data.player.username;
      this.dialog = true;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.attacker = null;
        this.$emit('close');
      }
    }
  },
  methods: {
    ...mapActions('game', [
      'useCard'
    ]),
    defend(used) {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'nopeIAmOnABreak',
          info: {
            used
          }
        }
      };
      this.useCard(data).then(() => this.dialog = false);
    }   
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>