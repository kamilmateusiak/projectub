<template>
  <v-col xs6>
    <p>Team: </p>
    <p v-for="member in teamMembers" :key="member._id">{{ member.name }} {{ member.surname }}</p>
  </v-col>
</template>

<script>
  export default {
    data () {
      return {
        teamMembers: []
      }
    },
    created () {
      this.$http.get(`users/all`).then(res => {
        return res.data
      })
      .then(data => {
        this.teamMembers = data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>
