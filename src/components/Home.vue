<template>
  <div>
    <app-rooms-list
      :projects="rooms"
      title="Join a room to play a game"
      no-projects="There is no rooms created at the moment"
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
    ...mapState('project', {
      rooms: state => state.rooms.all
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
