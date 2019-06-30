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
        Take two crystal's from a player
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
                Take
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
                  xs12
                  sm12
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="pickedCrystals.reduce((a, b) => a + b) > 0 && pickedCrystals.reduce((a, b) => a + b) <= 2"
          :loading="loading" 
          color="secondary"
          @click="take()"
        >
          Take
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
  name: 'TheseDontBelongToYouChoose',
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
      player: {},
      targets: [],
      target: {},
      pickedCrystals: [0, 0, 0, 0, 0, 0]
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
          if (this.target.crystals[i].amount < 2) {
            pickedCrystalsValues[i] = this.target.crystals[i].amount > 0 ? [0, 1] : [0];
          } else {
            pickedCrystalsValues[i] = [0, 1, 2];
          }
        }
      }
      return pickedCrystalsValues;
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.pickedCrystals = [0, 0, 0, 0, 0, 0];
        this.target = {};
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
    take() {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'theseDontBelongToYou',
          info: {
            from: this.target.user._id,
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