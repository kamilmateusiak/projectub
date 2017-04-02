<template>
  <div class="timeline-container">
    <h1>Projects Timeline</h1>
    <ol class="timeline">
      <single-project v-for="(project, index) in projects" :key="index" :project="project"></single-project>
    </ol>
    <router-link tag="button" class="btn light-blue darken-3 add-new-btn" :to="'/projects/new'">Dodaj</router-link>
  </div>
</template>

<script>
  import db from '../firebase'
  import SingleProject from '../components/SingleProject.vue'
  let projectsRef = db.ref('projects')

  export default {
    name: 'app',
    firebase () {
      return {
        projects: projectsRef
      }
    },
    components: {
      SingleProject
    }
  }
</script>
