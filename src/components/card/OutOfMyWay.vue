<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ username }} used Out of my way, each player lost one crystal.</span>
      </v-card-title>
      <v-card-text>
        <v-container 
          fluid
          class="pt-0"
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(lostCrystal, index) in crystals"
              :key="index"
              xs12
            >
              <v-layout
                row
                wrap
                align-center
                justify-start
              >
                <v-flex 
                  xs12
                  sm4
                >
                  <h1 class="text-xs-center subtitle">{{ lostCrystal.player.username }}</h1>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                >
                  <app-crystal
                    :name="lostCrystal.crystal"
                    :only-image="true"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <div v-if="finished">
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
  name: 'OutOfMyWay',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      dialog: false,
      loading: false,
      username: '',
      crystals: [],
      realLostCrystals: [],
      animationFinished: false,
      finished: false
    }
  },
  sockets: {
    outOfMyWay: function(data) {
      console.log(data);
      this.dialog = true;
      this.username = data.player.username;
      this.realLostCrystals = JSON.parse(JSON.stringify(data.crystalsLost));
      this.crystals = JSON.parse(JSON.stringify(this.realLostCrystals));
      this.crystalAnimation(0);
    },
  },
  computed: {
    ...mapState('crystal', {
      colors: state => state.colors
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.username = '';
        this.crystals = [];
        this.realLostCrystals = [];
        this.animationFinished = true;
        this.finished = false;
      }
    }
  },
  methods: {
    crystalAnimation(index) {
      this.finished = false;
      this.animationFinished = false;
      if (index > 25) {
        this.crystals = this.realLostCrystals;
        this.animationFinished = true;
        this.finished = true;
      } else {
        index++;
        this.changeCrystalColor();
        let crystalAnimation = this.crystalAnimation;
        setTimeout(function() { crystalAnimation(index) }, 100);
      }
    },
    changeCrystalColor() {
      for (let i = 0; i < this.crystals.length; i++) {
        this.crystals[i].crystal = Object.keys(this.colors)[Math.floor(Math.random() * (Object.keys(this.colors).length - 1))];
      }
    }
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>