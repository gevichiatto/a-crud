import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    genericData: {},
    previousRoute: {},
    filtersStored: {},
  },
  mutations: {
    setGenericData(state, objRouteData) {
      state.genericData = {
        ...state.genericData,
        ...objRouteData,
      };
    },
    setPreviousRoute(state, previousRoute) {
      state.previousRoute = previousRoute;
    },
    setFiltersStored(state, newFilters) {
      state.filtersStored = newFilters;
    },
  },
});

export default store;
