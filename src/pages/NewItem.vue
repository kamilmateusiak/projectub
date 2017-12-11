<template>
  <div style="margin-top: 50px;">
  <v-container>
    <form @submit.prevent="submit">
      <v-layout row>
        <v-flex xs6>
          <v-text-field
              v-model="newEvent.name"
              label="Nazwa"
              :rules="[validateName]"
            ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-text-field
              v-model="createdOn"
              label="Data dodania"
              :rules="[validateDate]"
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
        <v-flex xs5>
          <v-text-field
            v-model="attachment.name"
            label="Opis linku"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            v-model="attachment.href"
            label="Link"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn small icon outline class="blue--text item-icon" @click.native="removeLink(index)">
            <v-icon class="blue--text text--darken-2">delete</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-btn floating class="right blue"  @click.native="addAnotherLink">
        <v-icon light>add</v-icon>
      </v-btn>
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
  import _ from 'lodash'

  export default {
    data () {
      return {
        createdOn: new Date().toLocaleDateString('pl-PL'),
        attachments: [],
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
      },
      validateName () {
        if (this.newEvent.name.length === 0) {
          return 'Required!'
        } else {
          return true
        }
      },
      validateDate () {
        const re = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/
        if (this.createdOn.length === 0) {
          return 'Required!'
        } else if (!re.test(this.createdOn) && this.createdOn.length > 0) {
          return 'Wrong date format!'
        } else {
          return true
        }
      }
    },
    methods: {
      addAnotherLink () {
        this.attachments.push({ name: '', href: '' })
      },
      removeLink (index) {
        this.attachments = _.filter(this.attachments, (value, i) => i !== index)
      },
      submit () {
        if (this.validateName !== true ||
            this.validateDate !== true) {
          return toastr.error('Sprawdź wprowadzone dane!')
        }
        this.newEvent.date = this.date
        this.attachments = _.filter(this.attachments, (attachment) => {
          return attachment.name !== '' && attachment.href !== ''
        })
        return this.$http.post('/events',
          {
            newEvent: this.newEvent,
            attachments: this.attachments,
            project: this.project
          }
        )
        .then((response) => {
          console.log(response)
          toastr.success('Obiekt dodany!')
          this.newEvent.name = ''
          this.attachments = [ { name: '', href: '' } ]
          this.newEvent.description = ''
          this.createdOn = new Date().toLocaleDateString('pl-PL')
          this.$router.push({path: `/project/${this.$route.params.name}`})
        })
        .catch(err => {
          console.log(err)
          return toastr.error('Błąd dodawania! Sprawdź dane lub skontaktuj się z administratorem')
        })
      }
    }
  }
</script>
