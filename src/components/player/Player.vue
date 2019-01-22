<template>
  <v-container 
    fluid
    class="noTopPadding"
  >
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ name }}</h3>
            </div>
          </v-card-title>

          <v-container fluid>
            <v-layout 
              row
              wrap
            >
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

          <v-container 
            :class="{ bottomPadding: _id !== loggedUser._id }"
            fluid
          >
            <v-layout>
              <v-flex xs4>
                <v-icon color="yellow lighten-1">monetization_on</v-icon>{{ money }}
              </v-flex>
              <v-flex xs4>
                <v-icon color="indigo">class</v-icon>{{ cards }}
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-actions v-if="_id === loggedUser._id">
            <v-btn 
              :disabled="!currentTurn"
              flat 
              color="orange"
            >
              Use a card
            </v-btn>
            <v-spacer/>
            <v-btn 
              :disabled="!currentTurn"
              flat 
              color="orange"
            >
              Close mine
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'Player',
  components: {
    appCrystal: Crystal
  },
  props: {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    crystals: {
      type: Array,
      required: false,
      default: () => []
    },
    money: {
      type: Number,
      required: true
    },
    cards: {
      type: Number,
      required: true
    },
    currentTurn: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  }
}
</script>

<style lang="stylus" scoped>
  >>> .container {
    padding-bottom: 0px;
  }
  .noTopPadding {
    padding-top: 0px;
  }
  .bottomPadding {
    padding-bottom: 12px;
  }
  >>> .v-card__title {
    padding-bottom: 0px;
  }
</style>

