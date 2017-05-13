<template>
  <!-- <nav class="nav-extended light-blue darken-3">
    <div class="nav-wrapper">
      <a @click="navigateToHome" class="brand-logo">ProjectHub</a>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <router-link to="/" tag="li" class="tab" active-class="active" exact><a>Główna</a></router-link>
        <router-link to="/projects" class="tab" tag="li" active-class="active"><a>Projekty</a></router-link>
      </ul>
    </div>
  </nav> -->
  <v-tabs id="mobile-tabs-6" scroll-bars>
    <v-card class="primary white--text">
      <v-card-text>
        <v-card-row>
          <v-card-title>Page Title</v-card-title>
        </v-card-row>
      </v-card-text>
    </v-card>
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
