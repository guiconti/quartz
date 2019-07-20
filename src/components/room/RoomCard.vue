<template>
  <v-card>
    <v-card-title>
      <div class="card-content">
        <h3>{{ room.name }} {{ room.users.length }}/5</h3>
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
            v-for="user in room.users"
            :key="user._id"
          >
            {{ user.username }}
          </p>
        </v-card-text>
      </v-slide-y-transition>
    </div>

  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RoomCard',
  props: {
    room: {
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
    ...mapActions('room', [
      'joinRoom'
    ]),
    join() {
      this
        .joinRoom(this.room._id)
        .then(response => {
          this.$router.push({ path: `/rooms/${this.room._id}` })
        })
        .catch(err => {

        });
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

