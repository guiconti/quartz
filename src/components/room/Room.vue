<template>

</template>

<script>
import Chat from '../chat/Chat';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Room',
  computed: {
    ...mapState('room', {
      room: state => state.currentRoom
    }),
  },
  created() {
    this.roomInfo(this.$route.params.id);
  },
  methods: {
    ...mapActions('room', [
      'roomInfo'
    ])
  }
}
</script>

