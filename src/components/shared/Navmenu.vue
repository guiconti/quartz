<template>
  <v-toolbar>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"/>
      <v-list>
        <v-list-tile v-if="isLogged">
          <v-list-tile-content>
            <v-btn 
              flat>Create a room
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else>
          <v-list-tile-content>
            <app-login/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <router-link 
      to="/" 
      class="nav-link"
    >
      <v-toolbar-title>
        Quartz
      </v-toolbar-title>
    </router-link>

    <v-spacer/>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import Login from '../auth/Login';
import UserMenu from './UserMenu';

export default {
  name: 'Navmenu',
  components: {
    appLogin: Login,
    appUserMenu: UserMenu
  },
  data() {},
  computed: {
    ...mapState('auth', {
      isLogged: state => state.isLogged
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
