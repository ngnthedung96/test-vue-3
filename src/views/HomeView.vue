<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/Home.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
});
</script>
