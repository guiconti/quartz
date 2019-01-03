<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm4 offset-sm4>
        <app-player/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Player from '../player/Player';

export default {
  name: 'Room',
  components: {
    appPlayer: Player
  }
}
</script>

