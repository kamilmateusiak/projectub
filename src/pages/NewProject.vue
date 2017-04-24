<template>
  <div class="timeline-container" style="margin-top: 50px;">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="input-field col s12 m6">
          <input  id="project_name" type="text" class="validate" v-model="newProject.name">
          <label for="project_name">Nazwa</label>
        </div>
        </div>
      <button class="btn light-blue darken-3" type="submit">Dodaj</button>
    </form>
    <router-link tag="button" class="btn light-blue darken-3 add-new-btn" :to="'/projects'">Wróć</router-link>
  </div>
</template>

<script>
  import toastr from 'toastr'

  export default {
    data () {
      return {
        newProject: {
          name: '',
          date: Date.now
        }
      }
    },
    methods: {
      submit () {
        this.$http.post('/projects', this.newProject)
          .then(() => {
            toastr.success('Projekt dodany!')
            this.newProject.name = ''
            this.newProject = Date.now
            this.$router.push({path: '/projects'})
          })
          .catch((err) => {
            console.log(err)
            toastr.error('Projekt niedodany!')
          })
      }
    }
  }
</script>
