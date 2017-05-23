<template>
  <div style="margin-top: 50px;">
  <v-container>
    <form @submit.prevent="submit">
      <v-layout row>
        <v-flex xs6>
          <v-text-field
              v-model="newEvent.name"
              label="Nazwa"
            ></v-text-field>
        </v-flex>
      
        <v-flex xs6>
          <v-text-field
              v-model="createdOn"
              label="Data dodania"
            ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
              v-model="newEvent.description"
              label="Opis"
              multi-line
            ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout v-for="(attachment, index) in attachments" :key="index">
        <v-flex xs6>
          <v-text-field
              v-model="attachment.name"
              label="Opis linku"
            ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
              v-model="attachment.href"
              label="Link"
            ></v-text-field>
        </v-flex>
      </v-layout>
      
      <v-btn floating class="right blue"  @click.native="addAnotherLink">
        <v-icon light>add</v-icon>
      </v-btn>
      <!-- <a class="btn-floating btn-small waves-effect waves-light red right"><i class="material-icons">add</i></a> -->
      <v-btn light class="blue" type="submit">
        Dodaj
        <v-icon right light>send</v-icon>
      </v-btn>
      <v-btn light router :to="'/project/' + $route.params.name" class="blue add-new-btn">Wróć</v-btn>
    </form>
    </v-container>
  </div>
</template>

<script>
  import toastr from 'toastr'

  export default {
    data () {
      return {
        createdOn: new Date().toLocaleDateString('pl-PL'),
        attachments: [
          { name: '', href: '' }
        ],
        newEvent: {
          name: '',
          description: ''
        },
        project: this.$route.params.name
      }
    },
    computed: {
      date () {
        return new Date(this.createdOn.split('.').reverse().join('-'))
      }
    },
    methods: {
      addAnotherLink () {
        this.attachments.push({ name: '', href: '' })
      },
      submit () {
        this.newEvent.date = this.date
        this.$http.post('/events',
          {
            newEvent: this.newEvent,
            attachments: this.attachments,
            project: this.project
          }
        )
        .then((response) => {
          console.log(response)
          toastr.success('Item dodany!')
          this.newEvent.name = ''
          this.attachments = [ { name: '', href: '' } ]
          this.newEvent.description = ''
          this.createdOn = new Date().toLocaleDateString('pl-PL')
          this.$router.push({path: `/project/${this.$route.params.name}`})
        })
        .catch(err => {
          toastr.error(err)
        })
      }
    }
  }
</script>
