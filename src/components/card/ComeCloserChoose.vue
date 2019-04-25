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
        <v-toolbar-title>
          Trade one crystal with another player's crystal
        </v-toolbar-title>
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
                Give
              </h3>
            </v-flex>
            <v-radio-group v-model="givenCrystalIndex" row>
              <div 
                v-for="(crystal, index) in player.crystals"
                :key="index"
              >
                <div v-if="crystal.amount > 0 && crystal.name !== 'Autunita'">
                  <v-radio
                    color="orange" 
                    :value="index"
                  />
                  <app-crystal
                    :name="crystal.name"
                    :only-image="true"
                  />
                </div>
              </div>
            </v-radio-group>
            <v-flex xs12>
              <h3 class="title">
                Take
              </h3>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                v-model="target"
                :items="targets"
                item-text="user.username"
                return-object
                label="Select target"
              ></v-select>
            </v-flex>
            <v-flex
              v-if="target" 
              xs12
            >
              <v-radio-group v-model="pickedCrystalIndex" row>
                <div 
                  v-for="(crystal, index) in target.crystals"
                  item-text=""
                  :key="index"
                >
                  <div v-if="crystal.amount > 0 && crystal.name !== 'Autunita'">
                    <v-radio
                      color="orange" 
                      :value="index"
                    />
                    <app-crystal
                      :name="crystal.name"
                      :only-image="true"
                    />
                  </div>
                </div>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-btn
            v-if="givenCrystalIndex > -1 && pickedCrystalIndex > -1"
            :loading="loading" 
            @click="trade()"
          >
            Trade
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'ComeCloserChoose',
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
      givenCrystalIndex: -1,
      pickedCrystalIndex: -1
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
        this.givenCrystalIndex = -1;
        this.pickedCrystalIndex = -1;
        this.target = {};
        this.loading = false;
        this.$emit('close');
      } else {
        this.player = this.getCurrentPlayer()(this.loggedUser._id);
        this.targets = this.getOtherPlayers()(this.loggedUser._id);
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
    trade() {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'comeCloser',
          info: {
            from: this.target.user._id,
            given: this.player.crystals[this.givenCrystalIndex].name,
            taken: this.target.crystals[this.pickedCrystalIndex].name
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