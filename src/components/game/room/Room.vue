<template>
  <v-container fluid>
    <v-layout>
      <v-flex 
        xs12 
        sm3
      >
        <app-player 
          :crystals="crystals"
          :money="100"
          :cards="7"
          name="Guilherme" 
        />
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
  },
  data() {
    return {
      crystals: [
        {
          name: 'Quartzo',
          amount: 3
        },
        {
          name: 'Rubelita',
          amount: 1
        },
        {
          name: 'Esmeralda',
          amount: 0
        },
        {
          name: 'Safira',
          amount: 2
        },
        {
          name: 'Âmbar',
          amount: 0
        },
        {
          name: 'Autunita',
          amount: 1
        }
      ]
    }
  }
}
</script>

