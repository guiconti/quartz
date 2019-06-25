<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-list-tile slot="activator" v-if="drawer">
      <v-list-tile-content>
        <v-btn flat>
          Create room
        </v-btn>
      </v-list-tile-content>
    </v-list-tile>
    <v-btn
      v-else
      slot="activator"
      flat
    >
      Create room
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">New room</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form 
            ref="form" 
            v-model="valid" 
            lazy-validation
            @submit.prevent
          >
            <v-layout wrap>
              <v-flex xs12>
                <v-alert
                  :value="error"
                  type="error"
                >
                  {{ error }}
                </v-alert>
              </v-flex>
              <v-flex
                xs12 
              >
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  :validate-on-blur="true"
                  label="Name"
                  type="name"
                  required
                  @keyup.enter="submit"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn 
          color="blue darken-1"
          flat 
          @click.native="dialog = false"
        >
          Close
        </v-btn>
        <v-btn 
          :disabled="!valid"
          color="blue darken-1" 
          flat 
          type="submit" 
          @click.native="submit"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreateRoom',
  props: {
    drawer: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      isSignUp: false,
      valid: true,
      error: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ]
    }
  },
  methods: {
    ...mapActions('room', [
      'createRoom'
    ]),
    submit () {
      if (this.$refs.form.validate()) {
        this.error = false;
        const { name } = this;
        const body = { name };
        this.createRoom(body)
          .then(room => {
            this.dialog = false;
            this.$router.push({ path: `/rooms/${room._id}` })
          })
          .catch(err => {
            this.error = err;
          });
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
  .v-dialog__container {
    width: 100% !important
  }
  >>> .v-dialog__activator {
    height: 100%
  }
</style>
