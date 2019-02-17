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
      <v-card-title>
        <span class="headline">Use a card</span>
      </v-card-title>
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
              lg2
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
