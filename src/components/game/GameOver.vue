<template>
  <v-dialog 
    v-model="isGameOver" 
    full-width 
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Game over</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(player, index) in leaderboard"
              :key="player._id"
              xs12
            >
              <app-game-over-player
                :position="index + 1"
                :name="player.user.username"
                :money="player.money"
                :summary="summaries[index]"
              />
            </v-flex>
            <v-flex 
              xs12
              md4
              style="padding-top: 20px !important"
            >
              <v-btn
                color="secondary"
                @click="$router.push({ path: `/` })"
              >
                Voltar para o lobby
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import GameOverPlayer from './GameOverPlayer';

export default {
  name: 'GameOver',
  components: {
    appGameOverPlayer: GameOverPlayer,
  },
  props: {
    players: {
      type: Array,
      required: false,
      default: () => [],
    },
    summaries: {
      type: Array,
      required: false,
      default: () => [],
    },
    isGameOver: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    show: false,
  }),
  computed: {
    leaderboard: function() {
      let leaderboard = [];
      this.players.forEach(player => {
        leaderboard.push(player);
      });
      leaderboard.sort((a, b) => {
        if (a.money > b.money)
          return -1;
        if (a.money < b.money)
          return 1;
        return 0;
      });
      return leaderboard;
    }
  }
};
</script>

<style lang="stylus" scoped>
>>> .v-dialog__activator {
  height: 100%
}
</style>
