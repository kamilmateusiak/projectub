<template>
  <!-- Modal Structure -->
    <v-card>
      <v-card-row>
        <v-card-title>User Profile</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text>
          <v-text-field label="Email" required></v-text-field>
          <v-text-field label="Password" type="password" required></v-text-field>
          <v-text-field label="Legal first name" required></v-text-field>
          <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
          <v-text-field label="Legal last name" hint="example of persistent helper text"
            persistent-hint
            required
          ></v-text-field>
          <small>*indicates required field</small>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
      </v-card-row>
    </v-card>
    <!--<div class="modal-content">
      <form class="col s12" @submit.prevent="submit">
        <div class="row">
          <div class="input-field col s6">
            <input type="text" class="validate" v-model="editedItem.name">
            <label class="active">Nazwa</label>
          </div>
          <div class="input-field col s6">
            <input id="item_date" type="text" class="validate" v-model="editedItem.createdOn">
            <label for="item_date" class="active">Data dodania</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea class="materialize-textarea" v-model="editedItem.content"></textarea>
            <label class="active">Opis</label>
          </div>
        </div>
        <div class="row" v-for="link in editedItem.links">
          <div class="input-field col s5">
            <input type="text" class="validate" v-model="link.label">
            <label class="active">Opis linku</label>
          </div>
          <div class="input-field col s5">
            <input type="text" class="validate" v-model="link.href">
            <label class="active">Link</label>
          </div>
          <div class="col s2">
            <i class="delete-icon small material-icons" @click="deleteLink(link)">delete</i>
          </div>
        </div>
        <a class="btn-floating btn-small waves-effect waves-light red left" @click="addAnotherLink"><i class="material-icons">add</i></a>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn light-blue darken-3" @click.prevent="cancelEdit">Cancel</button>
      <button class="btn light-blue darken-3" @click.prevent="saveItem">Zapisz</button>
    </div>-->
</template>

<script>
  import { eventBus } from '../main'
  import _ from 'lodash'

  export default {
    props: ['item'],
    data () {
      return {
        editedItem: {
          name: this.item.name,
          createdOn: this.item.createdOn,
          content: this.item.content,
          links: this.item.links
        }
      }
    },
    methods: {
      addAnotherLink () {
        if (typeof this.editedItem.links === 'undefined') {
          this.editedItem.links = []
        }
        this.editedItem.links.push({ label: '', href: '' })
      },
      saveItem () {
        eventBus.$emit('itemWasEdited', {
          key: this.item['.key'],
          item: this.editedItem
        })
      },
      cancelEdit () {
        eventBus.$emit('editWasCanceled')
      },
      deleteLink (link) {
        let index = _.indexOf(this.editedItem.links, link)
        let links = this.editedItem.links
        this.editedItem.links.splice(index, 1)
        this.item.links = links
      }
    }
  }
</script>

<style>
  .delete-icon {
    cursor: pointer;
  }
</style>
