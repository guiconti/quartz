<template>
  <v-container fluid>
    <v-layout 
      row 
      wrap
    >
      <v-flex 
        xs2 
        white
      >
        <app-chat-users-list
          v-if="showUsers"
          :users="users"
        />
      </v-flex>
      <v-flex 
        :xs10="showUsers"
        :xs12="!showUsers"
      >
        <app-chat-messages :messages="messages"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChatUsersList from './ChatUsersList';
import ChatMessages from './ChatMessages';

export default {
  name: 'Chat',
  components: {
    appChatUsersList: ChatUsersList,
    appChatMessages: ChatMessages
  },
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    },
    messages: {
      type: Array,
      required: true,
      default: () => []
    },
    showUsers: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
