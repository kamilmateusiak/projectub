<template>
  <div>
    <v-container style="margin-top: 50px;">
      <p>{{ user.name }} {{ user.surname }}</p>
    </v-container>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        user: {}
      }
    },
    created () {
      this.$http.get(`users/me`, { headers: {'x-auth': localStorage.getItem('token')} }).then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        this.user = data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>
