<template>
  <v-card>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{name}}</h3>
      </div>
    </v-card-title>

    <v-container fluid>
      <app-crystal
        v-for="crystal in crystals"
        :key="crystal"
        :name="crystal.name"
        :amount="crystal.amount"
      />
    </v-container>

    <v-container fluid>
      <v-layout>
        <v-flex xs4>
        <v-icon color="yellow lighten-1">monetization_on</v-icon>{{money}}
        </v-flex>
        <v-flex xs4>
        <v-icon color="indigo">class</v-icon>{{cards}}
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-btn flat color="orange">Pick a crystal</v-btn>
      <v-spacer/>
      <v-btn flat color="orange">Close mine</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Crystal from './Crystal';

export default {
  name: 'Player',
  props: {
    name: String,
    crystals: Array,
    money: Number,
    cards: Number
  },
  components: {
    appCrystal: Crystal
  }
}
</script>
