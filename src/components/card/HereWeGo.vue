<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ username }} used Here we go and received 3 crystals</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(crystal, index) in crystals"
              :key="index"
              xs12
              md4
            >
              <app-crystal
                :name="crystal"
                :size="200"
                :only-image="true"
              />
            </v-flex>
          </v-layout>
          <div
            v-if="finished"
          >
            <h3> {{ username }} picked {{ realCrystals.join(', ') }} </h3>
            <v-btn
              @click="dialog = false"
            >
              Close
            </v-btn>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'HereWeGo',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      dialog: false,
      username: '',
      crystals: ['', '', ''],
      realCrystals: ['', '', ''],
      finished: false
    }
  },
  sockets: {
    hereWeGo: function(data) {
      this.dialog = true;
      this.username = data.player.username;
      this.realCrystals = data.crystals;
      this.crystals = ['', '', ''];
      this.crystalAnimation(0);
    }
  },
  computed: {
    ...mapState('crystal', {
      colors: state => state.colors
    }),
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.crystals = ['', '', ''];
        this.realCrystals = ['', '', ''];
        this.finished = false;
      }
    }
  },
  methods: {
    crystalAnimation(index) {
      this.finished = false;
      if (index > 25) {
        this.crystals = this.realCrystals;
        this.finished = true;
      } else {
        index++;
        this.changeCrystalColor();
        let crystalAnimation = this.crystalAnimation;
        setTimeout(function() { crystalAnimation(index) }, 100);
      }
    },
    changeCrystalColor() {
      // for (let i = 0; i < this.crystals.length; i++) {
      //   this.crystals[i] = Object.keys(this.colors)[Math.floor(Math.random() * (Object.keys(this.colors).length - 1))];
      // }
    }          
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>