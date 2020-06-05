<template>
  <div class="home container">
    <h1>{{day.date}} - ({{total}})</h1>
    <div v-for="food in foods" :key="food.id">
      <p>{{food.name}} - {{food.cal}}</p>
    </div>
    <!-- <form class="form-inline" @submit.prevent="addFood">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" placeholder="name" v-model="newFood.name" />
        <label for="cals">Cals</label>
        <input type="number" id="cals" class="form-control" v-model="newFood.cal" />
      </div>
      <button type="submit" class="btn btn-outline-success">Add Food</button>
    </form>-->
    <form class="form-inline" @submit.prevent="searchFood">
      <div class="form-group">
        <label for="search">Search</label>
        <input type="text" id="search" class="form-control" placeholder="search" v-model="search" />
      </div>
      <button type="submit" class="btn btn-outline-success">search</button>
    </form>
    <div v-for="result in results" :key="result.id">
      {{result.name}} - {{result.cal}}
      <button
        type="button"
        class="btn btn-outline-success"
        @click="addNutritionFood(result)"
      >Add Food</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const nutritionApi = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/natural/nutrients",
  timeout: 3000,
  headers: {
    "x-app-key": "8120134b8a361912934e53e415fffd2c",
    "x-app-id": "814a7db9"
  }
});

export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getDayById", this.$route.params.id)
    this.$store.dispatch("getFoodByDayId", this.$route.params.id)
  },
  data() {
    return {
      newFood: {},
      results: [],
      search: ''
    }
  },
  computed: {
    day() {
      return this.$store.state.activeDay
    },
    foods() {
      return this.$store.state.activeFoods
    },
    total() {
      let total = 0
      this.foods.forEach(f => total += f.cal)
      return total
    }
  },
  methods: {
    addFood() {
      this.$store.dispatch("addFood", { ...this.newFood, day: this.day.id })
      this.newFood = {}
    },
    addNutritionFood(food) {
      this.$store.dispatch("addFood", { ...food, day: this.day.id })
    },
    async searchFood() {
      let res = await nutritionApi.post("", { query: this.search })
      this.results = res.data.foods.map(r => {
        return { name: r.food_name, cal: r.nf_calories }
      })
    }
  }
};
</script>
