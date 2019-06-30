<template>
  <div>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      class="primary"
      fixed
      app
    >
      <v-list>
        <app-user-menu 
          v-if="isLogged"
          :drawer="true"
        />
        <app-create-room 
          v-if="isLogged"
          :drawer="true"
        />
        <app-login v-else/>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      v-if="showNavmenu"
      color="primary"
    >
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon 
          slot="activator"
          class="white--text"
          @click.stop="drawer = !drawer"
        />
      </v-menu>

      <router-link 
        to="/" 
        class="nav-link"
      >
        <v-toolbar-title class="white--text">
          Tiimus
        </v-toolbar-title>
      </router-link>

      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <app-create-room v-if="isLogged"/>
        <app-user-menu v-if="isLogged"/>
        <app-login v-else/>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Login from '../auth/Login';
import UserMenu from './UserMenu';
import CreateRoom from '../room/CreateRoom';

export default {
  name: 'Navmenu',
  components: {
    appLogin: Login,
    appUserMenu: UserMenu,
    appCreateRoom: CreateRoom
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapState('auth', {
      isLogged: state => state.isLogged
    }),
    ...mapState('user', {
      showNavmenu: state => state.navmenu
    })
  }
};
</script>

<style lang="stylus" scoped>
  >>> .nav-link {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  >>> .v-toolbar__title {
    margin-left: 20px
  }
  >>> .v-btn--flat {
    height: 100% !important;
  }
</style>
