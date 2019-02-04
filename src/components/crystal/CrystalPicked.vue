<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ username }} is picking a crystal</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <app-crystal
            :name="crystal"
            :size="200"
            :only-image="true"
          />
          <div
            v-if="finished"
          >
            <h3> {{ username }} picked a/an {{ realCrystal }} </h3>
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
import Crystal from './Crystal';

export default {
  name: 'CrystalPicked',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      dialog: false,
      username: '',
      crystal: '',
      realCrystal: '',
      finished: false
    }
  },
  sockets: {
    crystalPicked: function(crystalData) {
      this.dialog = true;
      this.username = crystalData.player.username;
      this.realCrystal = crystalData.crystal;
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
        this.crystal = '';
        this.realCrystal = '';
        this.finished = false;
      }
    }
  },
  methods: {
    crystalAnimation(index) {
      this.finished = false;
      if (index > 25) {
        this.crystal = this.realCrystal;
        this.finished = true;
      } else {
        index++;
        this.changeCrystalColor();
        let crystalAnimation = this.crystalAnimation;
        setTimeout(function() { crystalAnimation(index) }, 100);
      }
    },
    changeCrystalColor() {
      this.crystal = Object.keys(this.colors)[Math.floor(Math.random() * (Object.keys(this.colors).length - 1))];
    }          
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>
