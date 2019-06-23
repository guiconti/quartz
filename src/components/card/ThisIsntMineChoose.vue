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
        <v-toolbar-title v-if="player && player.crystals[player.crystals.length - 1].amount > 0">
          Send an Obsidian to another player
        </v-toolbar-title>
        <v-toolbar-title v-else>
          You don't have an Autunita to send to someone
        </v-toolbar-title>
      </v-toolbar>
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
          <div v-if="player && player.crystals[player.crystals.length - 1].amount > 0">
            <v-btn
              v-if="target !== {}"
              :loading="loading" 
              @click="send()"
            >
              Send
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </div>
        </v-container>
      </v-card-text>
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
      target: {}
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
        this.target = {};
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