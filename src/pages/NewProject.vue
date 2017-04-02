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
  import db from '../firebase'

  let projectsRef = db.ref('projects')

  export default {
    data () {
      return {
        newProject: {
          name: '',
          createdOn: new Date().toLocaleDateString('pl-PL')
        }
      }
    },
    firebase () {
      return {
        projects: projectsRef
      }
    },
    methods: {
      submit () {
        return projectsRef.push(this.newProject)
                .then(() => {
                  toastr.success('Projekt dodany!')
                  this.newProject.name = ''
                  this.newProject.createdOn = new Date().toLocaleDateString('pl-PL')
                  this.$router.push({path: '/project/:id', params: {id: this.route.params.id}})
                })
                .catch((err) => {
                  console.log(err)
                  toastr.error('Projekt niedodany!')
                })
      }
    }
  }
</script>
