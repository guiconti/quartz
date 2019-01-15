<template>
  <v-card>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ name }}</h3>
      </div>
    </v-card-title>

    <v-container fluid>
      <v-layout row>
        <v-flex
          v-for="crystal in crystals"
          :key="crystal.name" 
          xs2 
        >
          <app-crystal
            :name="crystal.name"
            :amount="crystal.amount"
          />
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-layout>
        <v-flex xs4>
          <v-icon color="yellow lighten-1">monetization_on</v-icon>{{ money }}
        </v-flex>
        <v-flex xs4>
          <v-icon color="indigo">class</v-icon>{{ cards }}
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-btn 
        flat 
        color="orange"
      >
        Pick a crystal
      </v-btn>
      <v-spacer/>
      <v-btn 
        flat 
        color="orange"
      >
        Close mine
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Crystal from './Crystal';

export default {
  name: 'Player',
  components: {
    appCrystal: Crystal
  },
  props: {
    name: {
      type: String,
      required: true
    },
    crystal: {
      type: Array,
      required: true
    },
    money: {
      type: Number,
      required: true
    },
    cards: {
      type: Number,
      required: true
    }
  }
}
</script>
