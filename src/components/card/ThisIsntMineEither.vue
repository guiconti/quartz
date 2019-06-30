<template>
  <v-dialog
    v-model="dialog"
    full-width
    persistent
  >
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <h3 class="subtitle">
          {{ attacker.username }} used This isn't mine and sent you an Obsidian. You have This isn't mine either
            and can send this crystal to another player. Select the player which you want to resend this Obsidian,
            if there's not a player to resend it it will go to the cave. If you don't want to use your card just click "Cancel".
        </h3>
      </v-toolbar>
      <v-card-text>
        <v-container 
          fluid
          class="pt-0"
        >
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <h3 class="title">
                Resend
              </h3>
            </v-flex>
            <v-flex 
              xs12 
              md4
            >
              <v-select
                v-model="target"
                :items="targets"
                item-text="user.username"
                return-object
                label="Select target"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-btn
            :loading="loading" 
            color="secondary"
            @click="resend(true)"
          >
            Resend
          </v-btn>
          <v-btn
            :loading="loading" 
            @click="resend(false)"
          >
            Cancel
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ThisIsntMineEither',
  data() {
    return {
      loading: false,
      attacker: {},
      targets: [],
      target: null,
      dialog: false,
    }
  },
  sockets: {
    thisIsntMineEither: function(data) {
      this.attacker = data.player;
      this.dialog = true;
    }
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.attacker = {};
        this.target = null;
        this.targets = [];
        this.loading = false;
        this.$emit('close');
      } else {
        this.targets = this.getOtherPlayers()([this.loggedUser._id, this.attacker._id]);
      }
    }
  },
  methods: {
    ...mapGetters('game', [
      'getCurrentPlayer',
      'getOtherPlayers'
    ]),
    ...mapActions('game', [
      'useCard'
    ]),
    resend(used) {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'notMineEither',
          info: {
            used,
            target: this.target ? this.target.user._id : ''
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