<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title
        v-if="player && player.crystals[player.crystals.length - 1].amount > 0"
        class="headline grey lighten-2"
        primary-title
      >
        Send an Obsidian to another player
      </v-card-title>
      <v-card-title
        v-else
        class="headline grey lighten-2"
        primary-title
      >
         You don't have an Autunita to send to someone
      </v-card-title>
      <v-card-text>
        <v-container 
          fluid
          class="pt-0"
        >
          <v-layout
            v-if="player && player.crystals[player.crystals.length - 1].amount > 0"
            row
            wrap
          >
            <v-flex xs12>
              <h3 class="title">
                Give
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
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="player && player.crystals[player.crystals.length - 1].amount > 0 && target"
          :loading="loading" 
          color="secondary"
          @click="send()"
        >
          Send
        </v-btn>
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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ThisIsntMineChoose',
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      player: null,
      targets: [],
      target: null
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
        this.player = null;
        this.target = null;
        this.targets = [];
        this.loading = false;
        this.$emit('close');
      } else {
        this.player = this.getCurrentPlayer()(this.loggedUser._id);
        this.targets = this.getOtherPlayers()([this.loggedUser._id]);
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
    send() {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'thisIsntMine',
          info: {
            target: this.target.user._id
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