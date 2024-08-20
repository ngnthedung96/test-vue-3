<template>
  <div class="my-3">
    <div class="top-content">
      <h1 class="fw-bold">Gemlogin Mini-App Store</h1>
      <span>
        Enhance all your operations effortlessly using Gemlogin's comprehensive
        suite of automation tools
      </span>
      <div class="filter-tools my-4">
        <a-input
          v-model:value="searchText"
          placeholder="Search name..."
          style="width: 200px"
          @pressEnter="updateQueryParams"
          class="me-2"
        >
          <template #prefix><SearchOutlined class="me-1" /> </template>
        </a-input>
        <a-select
          ref="select"
          v-model:value="selectedSort"
          style="width: 120px"
          @change="updateQueryParams"
        >
          <a-select-option value="none">Sort by</a-select-option>
          <a-select-option value="oldest">Oldest</a-select-option>
          <a-select-option value="lastest">Lastest</a-select-option>
          <a-select-option value="popular">Popular</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="container">
      <div class="row g-2">
        <div class="col-md-4" :key="app.id" v-for="app in paginatedApps">
          <a-card :bordered="false" class="text-start">
            <div class="m-1">
              <div class="card-top-content row">
                <div class="col-2">
                  <img
                    style="object-fit: contain; width: 100%; height: 100%"
                    alt="App logo"
                    src="@/assets/logo-facebook.png"
                  />
                </div>
                <div class="col-8 flex-column">
                  <div class="name-app">{{ app.name }}</div>
                  <div class="created-by">Created by {{ app.createdBy }}</div>
                </div>
                <div class="col-2">
                  <span class="btn btn-primary">
                    <VerticalAlignBottomOutlined class="mb-1" />
                  </span>
                </div>
              </div>
              <div class="card-middle-content mb-2">
                <div class="card-description mt-2 mb-3">
                  <span>{{ app.description }}</span>
                </div>
                <div class="card-date">
                  <span>Post date: {{ formatDate(app.createdAt) }}</span>
                </div>
              </div>
              <div
                class="card-bottom-content border-top pt-1 d-flex justify-content-between"
              >
                <div class="d-flex">
                  <div class="view me-3 d-flex align-items-center">
                    <EyeOutlined class="me-1" />
                    {{ app.numberView }}
                  </div>
                  <div class="download me-3 d-flex align-items-center">
                    <VerticalAlignBottomOutlined class="me-1" />
                    {{ app.numberDownload }}
                  </div>
                  <div class="star d-flex align-items-center">
                    <StarOutlined class="me-1" />
                    {{ app.star }}
                  </div>
                </div>
                <div class="type">
                  <a-badge :count="app.paid ? 'Paid' : 'Free'" />
                </div>
              </div>
            </div>
          </a-card>
        </div>
      </div>

      <a-pagination
        v-model:current="page"
        v-model:pageSize="limit"
        show-size-changer
        :total="totalApps"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import { App } from "@/constants/apps";
import dayjs from "dayjs";
import {
  EyeOutlined,
  VerticalAlignBottomOutlined,
  StarOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    EyeOutlined,
    VerticalAlignBottomOutlined,
    StarOutlined,
    SearchOutlined,
  },
  props: {
    apps: {
      type: Array as PropType<App[]>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const searchText = ref<string>(
      route.query.search ? String(route.query.search) : ""
    );
    const selectedSort = ref<string | undefined>(
      route.query.sort ? String(route.query.sort) : "none"
    );

    const page = ref<number>(Number(route.query.page) || 1);
    const limit = ref<number>(Number(route.query.limit) || 10);

    const updateQueryParams = () => {
      router.replace({
        query: {
          ...route.query,
          search: searchText.value,
          sort: selectedSort.value,
          page: page.value,
          limit: limit.value,
        },
      });
    };

    const formatDate = (timestamp: number): string => {
      return dayjs.unix(timestamp).format("DD-MM-YYYY");
    };

    const handlePageChange = (newPage: number) => {
      page.value = newPage;
      updateQueryParams();
    };

    const paginatedApps = computed(() => {
      const start = (page.value - 1) * limit.value;
      const end = start + limit.value;
      return props.apps.slice(start, end);
    });

    const totalApps = computed(() => props.apps.length);

    return {
      searchText,
      selectedSort,
      formatDate,
      paginatedApps,
      totalApps,
      page,
      limit,
      handlePageChange,
      updateQueryParams,
    };
  },
});
</script>
