// src/store/apps.ts
import { mockApps } from "@/mocks/mock-app";
import { App, AppType } from "@/constants/apps";
import { Module } from "vuex";

export interface appsState {
  apps: App[];
}

const state: appsState = {
  apps: [],
};

const mutations = {
  setApps(state: appsState, apps: App[]) {
    state.apps = [...apps];
  },
};

const actions = {
  fetchApps(
    { commit }: any,
    { search = "", category = "all", sort = "none", limit = 5, page = 1 }
  ) {
    let filteredApps = mockApps;
    if (search) {
      filteredApps = filteredApps.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== AppType.ALL) {
      filteredApps = filteredApps.filter((app) => app.type === category);
    }

    switch (sort) {
      case "lastest":
        console.log("lastest");
        filteredApps = filteredApps.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        console.log("oldest");
        filteredApps = filteredApps.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "popular":
        filteredApps = filteredApps.sort((a, b) => b.numberView - a.numberView);
        break;
      default:
        break;
    }
    console.log("commit nè");
    // Commit các apps vào state
    commit("setApps", filteredApps);
  },
};

const apps: Module<appsState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default apps;
