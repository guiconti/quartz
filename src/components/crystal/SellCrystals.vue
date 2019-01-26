<template>
  <v-dialog
    v-model="dialog"
    full-width
    persistent
  >
    <v-card>
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
          <v-btn
            @click="dialog = false"
          >
            Sell
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import Crystal from './Crystal';

export default {
  name: 'SellCrystals',
  components: {
    appCrystal: Crystal
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
    }
  },
  computed: {
    activateDialog: function() {
      if (this.isSelling)
        this.dialog = true
    },
    keepCrystalsValues: function() {
      let keepCrystalsValues = [[0], [0], [0], [0], [0], [0]];
      if (this.player.crystals) {
        for (let i = 0; i < this.player.crystals.length - 1; i++) {
          if (this.player.crystals[i].amount < 2) {
            keepCrystalsValues[i] = this.player.crystals[i].amount > 0 ? [0, 1]: [0];
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
      this.dialog = true
    }
  },
  methods: {       
  }
}

</script>

<style lang="stylus" scoped>
  >>> .v-dialog__activator {
    height: 100%
  }
  >>> v-select__selections {
    padding-right: 20px
  }
</style>