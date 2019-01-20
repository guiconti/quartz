<template>
  <v-card>
    <v-card-title>
      <div class="card-content">
        <h3>{{ room.name }} {{ room.users.length }}/4</h3>
      </div>
    </v-card-title>
    
    <div v-if="!reduced">
      <v-card-actions>
        <v-btn 
          flat
          color="orange" 
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
          <div
            v-for="user in room.users"
            :key="user.username"
          >
            {{ user.username }}
          </div>
        </v-card-text>
      </v-slide-y-transition>
    </div>

  </v-card>
</template>

<script>

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
  })
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

