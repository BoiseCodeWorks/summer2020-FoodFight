import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import api from "./AxiosService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    days: [],
    activeFoods: [],
    activeDay: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setDays(state, data) {
      state.days = data
    },
    addDays(state, data) {
      state.days.push(data)
    },
    setActiveDay(state, data) {
      state.activeDay = data
    },
    setActiveFoods(state, data) {
      state.activeFoods = data
    },
    addFood(state, data) {
      state.activeFoods.push(data)
    },
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getDays({ commit, dispatch }) {
      try {
        let res = await api.get('days')
        commit("setDays", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getDayById({ commit, dispatch }, id) {
      try {
        let res = await api.get('days/' + id)
        commit("setActiveDay", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async createDay({ commit, dispatch }, data) {
      try {
        let res = await api.post('days', data)
        commit("addDay", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getFoodByDayId({ commit, dispatch }, id) {
      try {
        let res = await api.get('days/' + id + "/foods")
        commit("setActiveFoods", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async addFood({ commit, dispatch }, data) {
      try {
        let res = await api.post('foods', data)
        commit("addFood", res.data)
      } catch (error) {
        console.error(error)
      }
    }



  }
});
