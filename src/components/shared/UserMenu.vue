<template>
  <div v-if="drawer">
    <v-list-tile>
      <v-list-tile-avatar
        color="grey lighten-4"
      >
        <img 
          src="../../../static/miner-avatar.png" 
          alt="avatar"
        >
      </v-list-tile-avatar>
      <v-list-tile-content>
        {{ user.username }}
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile
      v-for="(item, index) in items"
      :key="index"
      @click="item.click"
    >
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile>
  </div>
  <div v-else>
    <v-menu offset-y>
      <v-btn 
        slot="activator"
        flat
      >
        <v-avatar
          color="grey lighten-4"
        >
          <img 
            src="../../../static/miner-avatar.png" 
            alt="avatar"
          >
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="item.click"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserMenu',
  props: {
    drawer: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Sign out',
          click: this.signOut
        }
      ]
    }
  },
  computed: {
    ...mapState('user', {
      user: state => state.loggedUser,
      notificationSettings: state => state.notificationSettings
    })
  },
  mounted() {
    this
      .loggedInfo()
      .then(() => {
        if (this.notificationSettings.endpoint 
          && !this.loggedUserContainsSubscription(this.notificationSettings)
        ) {
          this.registerNotification(this.notificationSettings);
        }
      });
  },
  methods: {
    ...mapActions('auth', [
      'signOut'
    ]),
    ...mapActions('user', [
      'loggedInfo',
      'registerNotification'
    ])
  }
}
</script>