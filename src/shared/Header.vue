<template>
  <v-tabs id="mobile-tabs-6" scroll-bars>
    <v-card-row  class="primary white--text">
      <v-card-title>Projecthub</v-card-title>
      <v-btn icon @click.native="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-card-row>  
    <v-tab-item
      :class="{'tab__item--active': currentRoute === 'home'}"
      :router="true"
      to="/"
      slot="activators"
    >
      Home
    </v-tab-item>
    <v-tab-item
    :class="{'tab__item--active': currentRoute === 'projects'}"
      :router="true"
      to="/projects"
      slot="activators"
    >
      Projects
    </v-tab-item>
    
     
  </v-tabs>

</template>

<script>
  export default {
    data () {
      return {
        currentRoute: this.$route.name
      }
    },
    methods: {
      navigateToHome () {
        this.$router.push({path: '/'})
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>
  .tab {
    transition: background-color .5s ease-in-out;
  }
  .tab:hover {
    background-color: #1d4b6d;
    transition: background-color .5s ease-in-out;
  }
  .tab a {
    text-decoration: none;
  }
  .brand-logo {
    padding: 0 1.5rem;
    transition: color 1s ease-in-out;
  }
  .brand-logo:hover {
    text-decoration: none;
    color: #1d4b6d;
    transition: color .5s ease-in-out;
  }
</style>
