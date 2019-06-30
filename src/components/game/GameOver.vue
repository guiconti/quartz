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
              <h3 class="headline">
                {{ index + 1 }} - {{ player.user.username }} <v-icon color="yellow lighten-1">monetization_on</v-icon>{{ player.money }}
              </h3>
            </v-flex>
            <v-flex 
              xs12
              md4
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
export default {
  name: 'GameOver',
  props: {
    players: {
      type: Array,
      required: false,
      default: () => []
    },
    isGameOver: {
      type: Boolean,
      required: false,
      default: false
    }
  },
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
