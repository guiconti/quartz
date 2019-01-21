<template>
  <v-list>
    <v-list-tile 
      v-for="user in users" 
      :key="user._id" 
      avatar
    >
      <v-list-tile-avatar>
        <img src="../../../static/miner-avatar.png">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="user.username"/>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'ChatUsersList',
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

