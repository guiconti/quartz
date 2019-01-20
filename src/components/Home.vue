<template>
  <div>
    <app-rooms-list
      :rooms="rooms"
      title="Join a room to play a game"
      no-rooms="There is no rooms created at the moment"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RoomsList from './room/RoomsList';

export default {
  name: 'Home',
  components: {
    appRoomsList: RoomsList
  },
  computed: {
    ...mapState('room', {
      rooms: state => state.rooms
    })
  },
  created() {
    this.listRooms();
  },
  methods: {
    ...mapActions('room', [
      'listRooms'
    ])
  }
}
</script>
