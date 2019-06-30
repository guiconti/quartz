<template>
  <v-card>
    <v-card-title>
      <div class="card-content">
        <h3>{{ game.name }}</h3>
      </div>
    </v-card-title>
    
    <div v-if="!reduced">
      <v-card-actions>
        <v-btn
          v-if="isLogged"
          flat
          color="secondary" 
          @click="join"
        >
          Join
        </v-btn>
        <v-spacer/>
        <v-btn 
          icon 
          @click="show = !show"
        >
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <h4> Players </h4>
          <p
            v-for="player in game.players"
            :key="player._id"
          >
            {{ player.user.username }}
          </p>
        </v-card-text>
      </v-slide-y-transition>
    </div>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true
    },
    reduced: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    show: false
  }),
  computed: {
    ...mapGetters('auth', {
      isLogged: 'isLogged'
    })
  },
  methods: {
    join() {
      this.$router.push({ path: `/games/${this.game._id}` })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card-content{
    width: 100%
  }
  >>> .v-card__title {
    padding-bottom: 0px
  }
</style>

