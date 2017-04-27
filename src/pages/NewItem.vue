<template>
  <div class="row" style="margin-top: 50px;">
    <form class="col s12" @submit.prevent="submit">
      <div class="row">
        <div class="input-field col s6">
          <input  id="item_name" type="text" class="validate" v-model="newEvent.name">
          <label for="item_name">Nazwa</label>
        </div>
        <div class="input-field col s6">
          <input id="item_date" type="text" class="validate" v-model="createdOn">
          <label for="item_date" class="active">Data dodania</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="item_content" class="materialize-textarea" v-model="newEvent.description"></textarea>
          <label for="item_content">Opis</label>
        </div>
      </div>
      <div class="row" v-for="attachment in attachments">
        <div class="input-field col s6">
          <input type="text" class="validate" v-model="attachment.name">
          <label>Opis linku</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="validate" v-model="attachment.href">
          <label>Link</label>
        </div>
      </div>
      <a class="btn-floating btn-small waves-effect waves-light red right" @click="addAnotherLink"><i class="material-icons">add</i></a>
      <button class="btn light-blue darken-3" type="submit" name="action">Dodaj
        <i class="material-icons right">send</i>
      </button>
      <router-link tag="button" class="btn light-blue darken-3 add-new-btn" :to="'/project/' + $route.params.name">Wróć</router-link>
    </form>
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
