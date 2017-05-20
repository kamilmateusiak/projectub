<template>
  <div class="timeline-container" style="margin-top: 50px;">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="input-field col s12 m6">
        <v-text-field
            v-model="newProject.name"
            label="Nazwa"
          ></v-text-field>
        </div>
        </div>
      <v-btn primary dark type="submit">Dodaj</v-btn>
    </form>
    <v-btn primary dark router to="/projects" class="add-new-btn">Wróć</v-btn>
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
    computed: {
      user () {
        return this.$store.getters.user
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
