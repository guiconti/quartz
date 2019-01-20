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
        <div v-if="rooms && rooms.length > 0">
          <v-layout 
            row 
            wrap
          >
            <v-flex
              v-for="room in rooms"
              :key="room.id"
              xs12
              sm6
              md3
            >
              <app-room-card 
                :room="room" 
                :reduced="reduced"
              />   
            </v-flex>
          </v-layout>
        </div>
        <div 
          v-else
          class="title" 
        >
          {{ noRooms }}
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import RoomCard from './RoomCard';

export default {
  name: 'RommsList',
  components: {
    appRoomCard: RoomCard
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    rooms: {
      type: Array,
      required: false,
      default: () => []
    },
    noRooms: {
      type: String,
      required: true,
      default: 'No rooms'
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