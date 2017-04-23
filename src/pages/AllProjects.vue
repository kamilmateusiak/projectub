<template>
  <div class="row timeline-container">
    <div class="col s12 m8 l6">
      <h1>Projekty</h1>
      <ol class="timeline">
        <single-project v-for="project in projects" :key="project._id" :project="project"></single-project>
      </ol>
      <router-link tag="button" class="btn light-blue darken-3 add-new-btn" :to="'/projects/new'">Dodaj</router-link>
    </div>
  </div>
</template>

<script>
  import SingleProject from '../components/SingleProject.vue'

  export default {
    name: 'app',
    data () {
      return {
        projects: []
      }
    },
    created () {
      this.$http.get('projects').then(res => {
        return res.json()
      })
      .then(data => {
        let results = []
        for (let key in data) {
          results.push(data[key])
        }
        this.projects = results
      })
      .catch(err => {
        console.log(err)
      })
    },
    components: {
      SingleProject
    }
  }
</script>
