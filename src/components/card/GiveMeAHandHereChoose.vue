<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Select a target to mine two crystals
      </v-card-title>
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
                Target
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
          v-if="target"
          :loading="loading" 
          color="secondary"
          @click="makeItMine()"
        >
          Make it mine!
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
import Crystal from '../crystal/Crystal';

export default {
  name: 'GiveMeAHandHereChoose',
  components: {
    appCrystal: Crystal
  },
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
      targets: [],
      target: null
    }
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    }),
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.target = null;
        this.loading = false;
        this.$emit('close');
      } else {
        this.targets = this.getOtherPlayers()([this.loggedUser._id]);
      }
    }
  },
  methods: {
    ...mapGetters('game', [
      'getOtherPlayers'
    ]),
    ...mapActions('game', [
      'useCard'
    ]),
    makeItMine() {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'giveMeAHandHere',
          info: {
            target: this.target.user._id,
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