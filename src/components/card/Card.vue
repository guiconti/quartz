<template>
  <v-container fluid>
    <v-card>
      <v-layout 
        align-center 
        justify-center
      >
        <v-img 
          :src="image"
          :alt="description"
          :contain="false"
        />
      </v-layout>
      <v-card-actions v-if="!listOnly">
        <v-btn
          flat
          color="orange"
          @click="useCard()"
        >
          Usar
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          {{ description }}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Card',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    action: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: Number,
      required: false,
      default: 0
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    listOnly: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    useCard() {
      this.$emit('use-card', this.action);
    }
  }
}
</script>
