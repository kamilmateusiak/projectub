<template>
  
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span @click="navigateToHome" class="mdl-layout-title">ProjectHub</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation">
          <router-link to="/" tag="a" class="mdl-layout__tab mdl-navigation__link" active-class="is-active" exact>Główna</router-link>
          <router-link to="/projects" class="mdl-layout__tab mdl-navigation__link" tag="a" active-class="is-active">Projekty</router-link>
        </nav>
      </div>
    </header>
  
</template>

<script>
  export default {
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
