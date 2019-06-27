<template>
  <v-content>
    <app-service-worker />
    <app-navmenu/>
    <router-view/>
    <app-footer/>
  </v-content>
</template>

<script>
import Navmenu from './Navmenu';
import Footer from './Footer';
import ServiceWorker from './ServiceWorker';

export default {
  name: 'Content',
  components: {
    appNavmenu: Navmenu,
    appFooter: Footer,
    appServiceWorker: ServiceWorker,
  }
}
</script>

