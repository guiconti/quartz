<template>
  <v-container fluid>
    <div
      v-for="(message, index) in messages"
      :key="message._id"
      :class="{own: message.owner == loggedUser._id}"
    >
      <div
        class="username"
        v-if="index>0 && messages[index-1].owner._id != message.owner._id"
      >{{message.owner.username}}</div>
      <div class="username" v-if="index == 0">{{message.owner.username}}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.text"></div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatMessages",
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapState("user", {
      loggedUser: state => state.loggedUser
    })
  }
};
</script>

<style scoped>
.container {
  padding-top: 0px
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

