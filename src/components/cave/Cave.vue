<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Mining room</h3>
            </div>
          </v-card-title>

          <v-container fluid>
            <v-layout 
              row 
              wrap
            >
              <v-flex
                v-for="crystal in crystals"
                :key="crystal.name" 
                xs2 
              >
                <app-crystal
                  :name="crystal.name"
                  :amount="crystal.amount"
                />
              </v-flex>
            </v-layout>
            <v-flex xs4>
              <v-icon color="indigo" @click="listCardDialog = true">class</v-icon>{{ cards.length }}
            </v-flex>
          </v-container>
          <v-card-actions>
            <v-btn 
              :disabled="!player || !player.currentTurn || waitingPlayerForDefensiveResponse !== ''"
              flat 
              color="orange"
              @click="pickCrystal($route.params.id)"
            >
              <app-pickaxe-icon :size="30"/>
              Pick a crystal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <app-pick-card
      :current-turn="false"
      :cards="cards"
      :list-card="listCardDialog"
      @close="listCardDialog = false"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import Crystal from '../crystal/Crystal';
import PickaxeIcon from '../icons/PickaxeIcon';
import PickCard from '../card/PickCard';

export default {
  name: 'Cave',
  components: {
    appCrystal: Crystal,
    appPickaxeIcon: PickaxeIcon,
    appPickCard: PickCard
  },
  props: {
    crystals: {
      type: Array,
      required: false,
      default: () => []
    },
    player: {
      type: Object,
      required: false,
      default: () => {}
    },
    cards: {
      type: Array,
      required: false,
      default: () => []
    },
    waitingPlayerForDefensiveResponse: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      listCardDialog: false,
    }
  },
  methods: {
    ...mapActions('game', [
      'pickCrystal'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  >>> .container {
    padding-bottom: 0px;
  }
  >>> .v-card__title {
    padding-bottom: 0px;
  }
</style>
