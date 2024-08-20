<template>
  <div class="category-component px-5">
    <h2 class="text-start">Categories</h2>
    <a-menu
      mode="vertical"
      class="text-start border-end-0"
      :selectedKeys="[selectedCategory]"
      @click="handleMenuClick"
    >
      <a-menu-item key="All">Tất cả</a-menu-item>
      <a-menu-item key="Facebook">Facebook</a-menu-item>
      <a-menu-item key="Twitter">Twitter</a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CategoryComponent",
  props: {
    selectedCategory: {
      type: String as PropType<string>,
      default: "all",
    },
  },
  setup() {
    const router = useRouter();

    const handleMenuClick = (e: any) => {
      const selectedKey = e.key;
      router.push({
        query: { ...router.currentRoute.value.query, category: selectedKey },
      });
    };

    return {
      handleMenuClick,
    };
  },
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
