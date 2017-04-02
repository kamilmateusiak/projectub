<template>
  <div class="row" style="margin-top: 50px;">
    <form class="col s12" @submit.prevent="submit">
      <div class="row">
        <div class="input-field col s6">
          <input  id="item_name" type="text" class="validate" v-model="newItem.name">
          <label for="item_name">Nazwa</label>
        </div>
        <div class="input-field col s6">
          <input id="item_date" type="text" class="validate" v-model="newItem.createdOn">
          <label for="item_date" class="active">Data dodania</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="item_content" class="materialize-textarea" v-model="newItem.content"></textarea>
          <label for="item_content">Opis</label>
        </div>
      </div>
      <div class="row" v-for="link in newItem.links">
        <div class="input-field col s6">
          <input type="text" class="validate" v-model="link.label">
          <label>Opis linku</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="validate" v-model="link.href">
          <label>Link</label>
        </div>
      </div>
      <a class="btn-floating btn-small waves-effect waves-light red right" @click="addAnotherLink"><i class="material-icons">add</i></a>
      <button class="btn light-blue darken-3" type="submit" name="action">Dodaj
        <i class="material-icons right">send</i>
      </button>
      <router-link tag="button" class="btn light-blue darken-3 add-new-btn" :to="'/project/' + $route.params.id">Wróć</router-link>
    </form>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import db from '../firebase'

  export default {
    data () {
      return {
        newItem: {
          id: this.$route.params.id,
          name: '',
          createdOn: new Date().toLocaleDateString('pl-PL'),
          content: '',
          links: [
            { label: '', href: '' }
          ]
        }
      }
    },
    firebase () {
      return {
        items: db.ref(this.newItem.id)
      }
    },
    methods: {
      addAnotherLink () {
        this.newItem.links.push({ label: '', href: '' })
      },
      submit () {
        console.log(this.newItem.id)
        return db.ref(this.newItem.id).push(this.newItem)
                .then(() => {
                  toastr.success('Item dodany!')
                  this.newItem.name = ''
                  this.newItem.links = [ { label: '', href: '' } ]
                  this.newItem.content = ''
                  this.newItem.createdOn = new Date().toLocaleDateString('pl-PL')
                })
                .catch(err => {
                  toastr.error(err)
                })
      }
    }
  }
</script>
