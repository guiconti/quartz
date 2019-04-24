<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-btn 
      :disabled="!currentTurn"
      slot="activator"
      flat 
      color="orange"
    >
      Use a card
    </v-btn>
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-btn 
          flat 
          icon 
          @click="dialog = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          Use a card
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container fluid>
          <v-layout 
            row 
            wrap
          >
            <v-flex
              v-for="card in cards"
              :key="card._id"
              xs12
              sm12
              md3
              lg3
            >
              <app-card       
                :name="card.name"
                :action="card.action"
                :description="card.description"
                :type="card.type"
                :value="card.value"
                :image="card.image"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Card from './Card';

export default {
  name: 'PickCard',
  components: {
    appCard: Card
  },
  props: {
    currentTurn: {
      type: Boolean,
      required: false,
      default: false
    },
    cards: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false
    }
  }
}

</script>
