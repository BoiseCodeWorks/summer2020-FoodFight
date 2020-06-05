<template>
  <div class="home container">
    <form class="form-inline" @submit.prevent="createDay">
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="newDay.date" required />
      </div>
      <button type="submit" class="btn btn-outline-success">Create Day</button>
    </form>
    <ul>
      <li v-for="day in days" :key="day.id">
        <router-link :to="{name:'Day', params: {id: day.id}}">{{day.date}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      newDay: {}
    }
  },
  computed: {
    days() {
      return this.$store.state.days
    }
  },
  methods: {
    createDay() {
      this.$store.dispatch("createDay", { ...this.newDay })
      this.newDay = {}
    }
  }
};
</script>
