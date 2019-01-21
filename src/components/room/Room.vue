<template>
  <div>
    <app-chat 
      :users="room.users"
      :messages="messages"
    />
    <v-btn 
      v-if="room.owner && room.owner._id === loggedUser._id"
      large
      color="info"
      block
      @click="startGame()"
    >
      Start
    </v-btn>
  </div>
</template>

<script>
import Chat from '../chat/Chat';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Room',
  components: {
    appChat: Chat
  },
  data() {
    return {
      messages: [
        {
          owner: {
            _id: '5c3fc415ee6803a41dee74d7',
            username: 'Teste teste'
          },
          text: 'Testestestesteste'
        },
        {
          owner: {
            _id: 'zxczxczxc',
            username: 'sadaste'
          },
          text: 'nxbvnxnbnxbvnxvbnbvxnxbvnbxv'
        },
        {
          owner: {
            _id: 'zxczxczxc',
            username: 'sadaste'
          },
          text: 'ASDJKLASDJHLKASJDKLASJKLDAJSLKDJASKL'
        },
        {
          owner: {
            _id: 'hghghgf',
            username: 'mmmmmmmmm'
          },
          text: 'asdasdas'
        },
        {
          owner: {
            _id: '5c3fc415ee6803a41dee74d7',
            username: 'Teste teste'
          },
          text: 'Testestestesteste'
        },
        {
          owner: {
            _id: 'zxczxczxc',
            username: 'sadaste'
          },
          text: 'nxbvnxnbnxbvnxvbnbvxnxbvnbxv'
        },
        {
          owner: {
            _id: 'zxczxczxc',
            username: 'sadaste'
          },
          text: 'ASDJKLASDJHLKASJDKLASJKLDAJSLKDJASKL'
        },
        {
          owner: {
            _id: 'hghghgf',
            username: 'mmmmmmmmm'
          },
          text: 'asdasdas'
        },
        {
          owner: {
            _id: '5c3fc415ee6803a41dee74d7',
            username: 'Teste teste'
          },
          text: 'Testestestesteste'
        },
        {
          owner: {
            _id: 'zxczxczxc',
            username: 'sadaste'
          },
          text: 'nxbvnxnbnxbvnxvbnbvxnxbvnbxv'
        },
        {
          owner: {
            _id: 'zxczxczxc',
            username: 'sadaste'
          },
          text: 'ASDJKLASDJHLKASJDKLASJKLDAJSLKDJASKL'
        },
        {
          owner: {
            _id: 'hghghgf',
            username: 'mmmmmmmmm'
          },
          text: 'asdasdas'
        }
      ]
    }
  },
  computed: {
    ...mapState('room', {
      room: state => state.currentRoom
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  created() {
    this.roomInfo(this.$route.params.id);
  },
  methods: {
    ...mapActions('room', [
      'roomInfo'
    ]),
    ...mapActions('game', [
      'startGame'
    ])
  }
}
</script>

