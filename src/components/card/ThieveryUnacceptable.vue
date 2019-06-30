<template>
  <v-dialog
    v-model="dialog"
    full-width
    persistent
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ attacker.username }} used These dont belong to you to steal {{ crystalsTook }}
      </v-card-title>
      <v-card-text>
        You have the 
          Thievery unacceptable card and can counter this taking one crystal from him/her. Choose your crystal
          and take it. If you don't want to use your card click "Cancel"
      </v-card-text>
      <v-card-text>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <h3 class="title">
              Take
            </h3>
          </v-flex>
          <v-flex
            v-if="target" 
            xs12
          >
            <v-layout 
              row 
              wrap
            >
              <v-flex
                v-for="(crystal, index) in target.crystals"
                :key="crystal.name"
                xs4
                md2
                lg2
              >
                <div v-if="index < target.crystals.length - 1">
                  <app-crystal
                    :name="crystal.name"
                    :amount="crystal.amount"
                    :only-image="true"
                  />
                  <div 
                    class="text-xs-center" 
                    style="padding-right: 20px; padding-left: 20px;"
                  >
                    <v-select
                      v-model="pickedCrystals[index]"
                      :items="pickedCrystalsValues[index]"
                    />
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :loading="loading" 
          color="secondary"
          @click="counter(true)"
        >
          Counter
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading" 
          @click="counter(false)"
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
  name: 'ThieveryUnacceptable',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      loading: false,
      attacker: {},
      target: null,
      crystalsTook: '',
      pickedCrystals: [0, 0, 0, 0, 0, 0],
      dialog: false,
    }
  },
  sockets: {
    thieveryUnacceptable: function(data) {
      this.attacker = data.attacker;
      this.crystalsTook = data.crystalsTook;
      this.dialog = true;
    }
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    }),
    pickedCrystalsValues: function() {
      let pickedCrystalsValues = [[0], [0], [0], [0], [0], [0]];
      if (this.target) {
        for (let i = 0; i < this.target.crystals.length - 1; i++) {
          pickedCrystalsValues[i] = this.target.crystals[i].amount > 0 ? [0, 1] : [0];
        }
      }
      return pickedCrystalsValues;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.attacker = {};
        this.target = null;
        this.crystalsTook = '';
        this.pickedCrystals = [0, 0, 0, 0, 0, 0];
        this.loading = false;
        this.$emit('close');
      } else {
        this.player = this.getCurrentPlayer()(this.loggedUser._id);
        this.target = this.getCurrentPlayer()(this.attacker._id);
      }
    }
  },
  methods: {
    ...mapGetters('game', [
      'getCurrentPlayer'
    ]),
    ...mapActions('game', [
      'useCard'
    ]),
    counter(used) {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'thieveryUnacceptable',
          info: {
            used,
            pickedCrystals: this.pickedCrystals
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