<template>
  <v-dialog 
    v-model="dialog" 
    full-width 
    persistent
  >
    <v-card>
      <v-container>
        <v-layout 
          row 
          wrap
        >
          <v-flex 
            sm12 
            md6
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
                      from="Quartzo"
                      to="Safira"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <app-crystal-combo2
                      from="Quartzo"
                      toFirst="Safira"
                      toSecond="Rubi"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-radio/>
                  </v-flex>
                  <v-flex xs12>
                    <v-radio/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-flex>
          <v-flex 
            sm12 
            md6
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
                    xs12
                    sm12
                    md2
                    lg2
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
        <v-btn @click="dialog = false"> Finish </v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import Crystal from './Crystal';
import CrystalCombo1 from './CrystalCombo1';
import CrystalCombo2 from './CrystalCombo2';

export default {
  name: 'SellCrystals',
  components: {
    appCrystal: Crystal,
    appCrystalCombo1: CrystalCombo1,
    appCrystalCombo2: CrystalCombo2
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
      dialog: false,
      keepCrystals: [0, 0, 0, 0, 0, 0]
    };
  },
  computed: {
    activateDialog: function() {
      if (this.isSelling) this.dialog = true;
    },
    keepCrystalsValues: function() {
      let keepCrystalsValues = [[0], [0], [0], [0], [0], [0]];
      if (this.player.crystals) {
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
  created() {
    if (this.isSelling) {
      this.dialog = true;
    }
  },
  methods: {}
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
