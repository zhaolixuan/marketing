<template>
  <div class="policy">
    <v-head></v-head>
    <router-view></router-view>
  </div>
</template>

<script>
import vHead from "./header.vue";
export default {
  components: {
    vHead,
  },
};
</script>
