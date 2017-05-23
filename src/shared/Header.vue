<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title class="hidden-sm-and-down">Projecthub</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon light @click.native="navigateToAccount">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn icon light @click.native="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-tabs light>
      <v-tabs-bar slot="activators">
        <v-tabs-slider></v-tabs-slider>
        <v-tabs-item
          router
          href="/"
          exact
        >
          Home
        </v-tabs-item>
        <v-tabs-item
          router
          href="/projects"
        >
          Projects
        </v-tabs-item>
      </v-tabs-bar>
    </v-tabs>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        currentRoute: this.$route.name
      }
    },
    methods: {
      navigateToAccount () {
        this.$router.push({path: '/account'})
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    box-shadow: none;
  }
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
