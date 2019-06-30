<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-btn
      v-if="!cave"
      slot="activator"
      :disabled="!currentTurn || waitingPlayerForDefensiveResponse !== ''"
      flat 
      color="secondary"
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
                :list-only="listCard"
                @use-card="cardPicked"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import Card from './Card';
import constants from '../../utils/constants';

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
    },
    listCard: {
      type: Boolean,
      required: false,
      default: false,
    },
    cave: {
      type: Boolean,
      required: false,
      default: false,
    },
    waitingPlayerForDefensiveResponse: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$emit('close');
      }
    },
    listCard(val) {
      if (val) {
        this.dialog = true;
      }
    }
  },
  methods: {
    ...mapActions('game', [
      'useCard'
    ]),
    cardPicked(card) {
      this.dialog = false;
      if (constants.cards_with_preparation.includes(card)) {
        const event = card.split('').map(char => {
          return char !== char.toLowerCase() ? '-' + char.toLowerCase() : char;
        }).join('');
        this.$emit(event);
      } else {
        const data = {
          param: this.$route.params.id,
          body: {
            action: card
          }
        };
        this.useCard(data)
          .then(() => {
          })
          .catch(err => {

          });
      }
    }
  }
}

</script>
