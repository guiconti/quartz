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

    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Crystal from './Crystal';

export default {
  name: 'Player',
  props: {
    name: String,
    crystals: Array
  },
  components: {
    appCrystal: Crystal
  }
}
</script>
