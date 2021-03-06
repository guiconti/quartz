<template>
  <v-dialog 
    v-model="isSelling" 
    full-width 
    persistent
  >
    <v-card v-if="player && !player.soldCrystals">
      <v-container>
        <v-layout 
          row 
          wrap
        >
          <v-flex
            sm12
            md3
          >
            <v-card-title>
              <span class="headline">Your crystals</span>
            </v-card-title>
            <v-layout 
              row 
              wrap
            >
              <v-flex
                v-for="(crystal, index) in player.crystals"
                :key="crystal.name"
                xs4
                md4
              >
                <div v-if="index < player.crystals.length - 1">
                  <app-crystal
                    :name="crystal.name"
                    :amount="crystal.amount"
                    :only-image="false"
                    :center-text="true"
                    :value="crystal.value"
                  />
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex 
            sm12 
            md5
          >
            <v-card-title>
              <span class="headline">Choose a sell combo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout 
                  column 
                  wrap
                >
                  <v-flex xs12>
                    <app-crystal-combo1
                      :crystals="player.crystals"
                      from="Quartzo"
                      to="Safira"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <app-crystal-combo2
                      :crystals="player.crystals"
                      from="Quartzo"
                      to-first="Safira"
                      to-second="Rubi"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <app-crystal-combo3
                      :crystals="player.crystals"
                      from-first="Quartzo"
                      from-second="Rubelita"
                      from-third="Esmeralda"
                      from-forth="Safira"
                      from-fifth="Rubi"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <app-crystal-combo4
                      :crystals="player.crystals"
                      from-first="Quartzo"
                      from-second="Rubelita"
                      from-third="Esmeralda"
                      from-forth="Safira"
                      from-fifth="Rubi"
                      from-sixth="Âmbar"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-flex>
          <v-flex 
            sm12 
            md4
          >
            <v-card-title>
              <span class="headline">Choose crystals to keep (2 max total)</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout 
                  row 
                  wrap
                >
                  <v-flex
                    v-for="(crystal, index) in player.crystals"
                    :key="crystal.name"
                    xs4
                  >
                    <div v-if="index < player.crystals.length - 1">
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
                          v-model="keepCrystals[index]"
                          :items="keepCrystalsValues[index]"
                        />
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-flex>
        </v-layout>
        <h3 
          v-if="!validSelling"
          class="headline red--text"
        >
          Selling and keep options are not valid.
        </h3>
        <v-btn 
          :disabled="!enableSelling"
          color="secondary"
          @click="send"
        > Finish </v-btn>
      </v-container>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <span class="headline">Waiting for others to finish selling</span>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import EventBus from '../../utils/event-bus';
import Crystal from './Crystal';
import CrystalCombo1 from './CrystalCombo1';
import CrystalCombo2 from './CrystalCombo2';
import CrystalCombo3 from './CrystalCombo3';
import CrystalCombo4 from './CrystalCombo4';

export default {
  name: 'SellCrystals',
  components: {
    appCrystal: Crystal,
    appCrystalCombo1: CrystalCombo1,
    appCrystalCombo2: CrystalCombo2,
    appCrystalCombo3: CrystalCombo3,
    appCrystalCombo4: CrystalCombo4
  },
  props: {
    player: {
      type: Object,
      required: false,
      default: () => {}
    },
    isSelling: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      validSelling: true,
      enableSelling: true,
      keepCrystals: [0, 0, 0, 0, 0, 0],
      combo: {
        type: -1
      }
    };
  },
  computed: {
    keepCrystalsValues: function() {
      let keepCrystalsValues = [[0], [0], [0], [0], [0], [0]];
      if (this.player) {
        for (let i = 0; i < this.player.crystals.length - 1; i++) {
          if (this.player.crystals[i].amount < 2) {
            keepCrystalsValues[i] = this.player.crystals[i].amount > 0 ? [0, 1] : [0];
          } else {
            keepCrystalsValues[i] = [0, 1, 2];
          }
        }
      }
      return keepCrystalsValues;
    }
  },
  watch: {
    isSelling: function(val) {
      if (val) {
        this.enableSelling = true;
      }
    }
  },
  created() {
    EventBus.$on('combo-filled', comboData => {
      this.combo = comboData;
    });
  },
  mounted() {
    this.keepCrystals = [0, 0, 0, 0, 0, 0],
    this.combo = {
      type: -1
    }
  },
  methods: {
    ...mapActions('game', [
      'sell'
    ]),
    send() {
      this.validSelling = true;
      let amountOfValidCrystals = 0;
      let amountOfKeepCrystals = 0;
      for (let i = 0; i < this.keepCrystals.length; i++) {
        amountOfKeepCrystals += this.keepCrystals[i];
      }
      this.isValidSelling = amountOfKeepCrystals >= 0 && amountOfKeepCrystals <= 2;
      switch (this.combo.type) {
        case 0:
          for (let i = 0; i < this.player.crystals.length - 1; i++) {
            if (this.player.crystals[i].name === this.combo.conversion.from) {
              if (this.player.crystals[i].amount - this.keepCrystals[i] < 3) {
                this.validSelling = false;
                break;
              }
            }
          }
          break;
        case 1:
          for (let i = 0; i < this.player.crystals.length - 1; i++) {
            if (this.player.crystals[i].name === this.combo.conversion.from) {
              if (this.player.crystals[i].amount - this.keepCrystals[i] < 4) {
                this.validSelling = false;
                break;
              }
            }
          }
          break;
        case 2:
          amountOfValidCrystals = 0;
          for (let i = 0; i < this.player.crystals.length - 1; i++) {
            if (this.player.crystals[i].amount - this.keepCrystals[i] > 0)
              amountOfValidCrystals++;
          }
          if (amountOfValidCrystals < 5)
            this.validSelling = false;
          break;
        case 3:
          amountOfValidCrystals = 0;
          for (let i = 0; i < this.player.crystals.length - 1; i++) {
            if (this.player.crystals[i].amount - this.keepCrystals[i] > 0)
              amountOfValidCrystals++;
          }
          if (amountOfValidCrystals < 6)
            this.validSelling = false
          break;
        default:
          break;
      }
      if (this.validSelling) {
        this.enableSelling = false;
        const sellingData = {
          keepCrystals: this.keepCrystals,
          combo: this.combo
        };
        const gameId = this.$route.params.id;
        this.sell({ gameId, sellingData })
          .then()
          .catch(err => {
            this.validSelling = false;
            this.enableSelling = true;
          });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
>>> .v-dialog__activator {
  height: 100%
}
>>> v-select__selections {
  padding-right: 20px
}
</style>
