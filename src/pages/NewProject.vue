<template>
  <div class="timeline-container" style="margin-top: 50px;">
    <form @submit.prevent="submit">
      <v-layout row>
        <v-flex xs6>
          <v-text-field
              v-model="newProject.name"
              label="Nazwa"
              :rules="[validateName]"
            ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn light class="blue" type="submit">Dodaj</v-btn>
    </form>
    <v-btn light router to="/projects" class="blue add-new-btn">Wróć</v-btn>
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
      },
      validateName () {
        var re = /\s/g
        if (this.newProject.name.length === 0) {
          return 'Required!'
        } else if (re.test(this.newProject.name) && this.newProject.name.length > 0) {
          return 'Name must not have white space!'
        } else {
          return true
        }
      }
    },
    methods: {
      submit () {
        if (this.validateName !== true) {
          return toastr.error('Sprawdź dane!')
        }
        return this.$http.post('/projects', this.newProject)
          .then(() => {
            toastr.success('Projekt dodany!')
            this.newProject.name = ''
            this.newProject = Date.now
            this.$router.push({path: '/projects'})
          })
          .catch((err) => {
            console.log(err)
            toastr.error('Nie udało się dodać projektu. Sprawdź dane!')
          })
      }
    }
  }
</script>
