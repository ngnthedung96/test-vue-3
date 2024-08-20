<template>
  <div class="row g-2">
    <div class="col col-md-3">
      <Category :selectedCategory="selectedCategory" />
    </div>
    <div class="col col-md-9" style="background: #eff2f7">
      <DataTable :apps="apps" />
    </div>
  </div>
</template>

<script lang="ts">
import Category from "@/containers/home/Category.vue";
import DataTable from "@/containers/home/DataTable.vue";
import { defineComponent, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { App } from "@/constants/apps"; // Adjust path as necessary

export default defineComponent({
  name: "HomeComponent",
  components: {
    Category,
    DataTable,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const selectedCategory = computed(() => {
      return route.query.category ? (route.query.category as string) : "all";
    });

    const apps = computed(() => {
      return store.state.apps.apps;
    });

    const fetchApps = () => {
      const { search, category, sort, limit, page } = route.query;
      store.dispatch("apps/fetchApps", { search, category, sort, limit, page });
    };

    watch(
      () => route.query,
      (newCategory) => {
        let { sort, category, limit, page } = newCategory;
        if (!category) {
          router.replace({ query: { ...route.query, category: "All" } });
        }
        if (!sort) {
          router.replace({ query: { ...route.query, sort: "none" } });
        }
        if (!limit) {
          router.replace({ query: { ...route.query, limit: 5 } });
        }
        if (!page) {
          router.replace({ query: { ...route.query, page: 1 } });
        }

        fetchApps();
      },
      { immediate: true }
    );

    return {
      selectedCategory,
      apps,
    };
  },
});
</script>
