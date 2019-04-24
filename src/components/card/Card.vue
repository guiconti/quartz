<template>
  <v-container fluid>
    <v-card>
      <v-img 
        :src="image"
        :alt="description"
        contain="true"
        height="250"
        width="150"
      />
      <v-card-title 
        primary-title 
        class="pt-0 pb-0"
      >
        <div>
          <h3 class="subheadline pt-0">{{ name }}</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn 
          icon 
          @click="show = !show"
        >
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
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
    }
  },
  data() {
    return {
      show: false
    };
  }
}
</script>
