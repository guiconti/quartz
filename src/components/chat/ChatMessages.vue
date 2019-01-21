<template>
  <div>
    <v-container fluid>
      <div
        v-for="(message, index) in messages"
        :key="message._id"
        :class="{own: message.owner._id == loggedUser._id}"
      >
        <div
          class="username"
          v-if="index>0 && messages[index-1].owner._id != message.owner._id"
        >{{message.owner.username}}</div>
        <div class="username" v-if="index == 0">{{message.owner.username}}</div>
        <div style="margin-top: 5px"></div>
        <div class="content">
          <div v-html="message.content"></div>
        </div>
      </div>
    </v-container>
    <v-text-field
      v-model="content"
      label="Type"
      style="margin-left: 20px;"
      @keydown.enter="send"
    ></v-text-field>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ChatMessages",
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  methods: {
    ...mapActions('message', [
      'sendMessage'
    ]),
    send() {
      let messageData = {
        parent: this.$route.params.id,
        content: this.content
      };
      this.sendMessage(messageData);
      this.content = '';
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 0px;
  box-sizing: border-box;
  height: calc(100vh - 19.5rem);
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
.username {
  font-size: 18px;
  font-weight: bold;
}
.content {
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

