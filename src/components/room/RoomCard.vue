<template>
  <v-card :to="'/projects/' + project.id">
    <v-card-title>
      <div class="card-content">
        <h3>{{ room.name }}</h3>
      </div>
    </v-card-title>
    <!--
    <div v-if="!reduced">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          {{ project.description }}
        </v-card-text>
      </v-slide-y-transition>
    </div>
    !-->

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
</style>

