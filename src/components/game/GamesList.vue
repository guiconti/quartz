<template>
  <v-layout 
    row 
    justify-center
    align-center
  >
    <v-flex 
      xs12 
      sm12
    >
      <v-container
        fluid
        grid-list-md
      >
        <div class="headline">{{ title }}</div>
        <div v-if="games && games.length > 0">
          <v-layout 
            row 
            wrap
          >
            <v-flex
              v-for="game in games"
              :key="game._id"
              xs12
              sm6
              md3
            >
              <app-game-card 
                :game="game" 
                :reduced="reduced"
              />   
            </v-flex>
          </v-layout>
        </div>
        <div 
          v-else
          class="title" 
        >
          {{ noGames }}
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import GameCard from './GameCard';

export default {
  name: 'GamesList',
  components: {
    appGameCard: GameCard
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    games: {
      type: Array,
      required: false,
      default: () => []
    },
    noGames: {
      type: String,
      required: true,
      default: 'No games'
    },
    reduced: {
      type: Boolean,
      required: false,
      default: false
    }
  },
}
</script>

<style lang="stylus" scoped>
  >>> .headline {
    margin-bottom: 24px;
  }
</style>