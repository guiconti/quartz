<template>
  <div>
    <v-container
      ref="chat" 
      fluid
      :style="`height: calc(${size}vh - 19.5rem);`"
    >
      <div
        v-for="(message, index) in messages"
        :key="message._id"
        :class="{ 
          own: message.owner && message.owner._id == loggedUser._id,
          log: !message.owner
        }"
      >
        <div
          v-if="((index > 0 && !messages[index - 1].owner && message.owner) || index > 0 && messages[index - 1].owner && message.owner && messages[index - 1].owner._id != message.owner._id) || (index == 0 && message.owner)"
          class="username"
        >
          {{ message.owner.username }}
        </div>
        <div v-else-if="index > 0 && !message.owner && messages[index - 1].owner || index == 0" class="username">
          Log
        </div>
        <div class="content">
          {{ message.content }}
        </div>
      </div>
    </v-container>
    <v-text-field
      v-model="content"
      label="Type"
      style="margin-left: 20px;"
      @keydown.enter="send"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ChatMessages',
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => []
    },
    size: {
      type: Number,
      required: false,
      default: 100
    },
  },
  data() {
    return {
      content: ''
    };
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  sockets: {
    newMessage: function(message) {
      this.pushMessage(message);
    }
  },
  updated() {
    this.scrollBottom();
  },
  beforeDestroy() {
    this.sockets.unsubscribe('newMessage');
  },
  methods: {
    ...mapActions('message', [
      'sendMessage',
      'pushMessage'
    ]),
    send() {
      const messageData = {
        parent: this.$route.params.id,
        content: this.content
      };
      this.sendMessage(messageData);
      this.content = '';
    },
    scrollBottom() {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 0px;
  box-sizing: border-box;
  /* height: calc(45vh - 19.5rem); */
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.own {
  text-align: right;
}
.own .content {
  background-color: lightskyblue;
}
.log .content {
  background-color: #bbbaba !important;
}
.username {
  font-size: 18px;
  font-weight: bold;
}
.content {
  margin-top: 5px;
  padding: 8px;
  margin-bottom: 3px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
</style>
