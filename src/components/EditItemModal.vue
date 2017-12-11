<template>
  <!-- Modal Structure -->
  <v-layout row justify-center>
    <v-dialog class="dialog--white" lazy v-model="isEditing" width="80%">
      <v-card>
        <v-card-row>
          <v-card-text>
            <v-layout row>
              <v-flex xs6>
                <v-text-field
                    v-model="editedItem.name"
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
                    v-model="editedItem.description"
                    label="Opis"
                    multi-line
                  ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout v-for="(attachment, index) in editedItem.attachments" :key="index">
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
                <v-btn small icon outline class="blue--text item-icon" @click.native.stop="deleteLink(attachment)">
                  <v-icon class="blue--text text--darken-2">delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-btn floating class="right blue" @click.native="addAnotherLink">
              <v-icon light>add</v-icon>
            </v-btn>
            <v-btn light class="blue" @click.native="cancelEdit">
              Close
            </v-btn>
            <v-btn light class="blue" @click.native="saveItem">
              Save
              <v-icon right light>send</v-icon>
            </v-btn>
          </v-card-text>
        </v-card-row>
      </v-card>
  </v-dialog>
  </v-layout>
</template>

<script>
  import { eventBus } from '../main'
  import toastr from 'toastr'
  import _ from 'lodash'

  export default {
    data () {
      return {
        beforeEdit: {},
        editedItem: {},
        isEditing: false
      }
    },
    computed: {
      createdOn () {
        if (this.editedItem.date) {
          return new Date(this.editedItem.date).toLocaleDateString('pl-PL')
        }
        return ''
      }
    },
    created () {
      eventBus.$on('editEvent', (data) => {
        this.isEditing = true
        this.beforeEdit = {
          name: data.name,
          date: data.date,
          description: data.description,
          attachments: []
        }
        _.forEach(data.attachments, (attachment) => {
          this.beforeEdit.attachments.push({
            name: attachment.name,
            href: attachment.href
          })
        })
        this.editedItem = data
      })
    },
    methods: {
      addAnotherLink () {
        if (typeof this.editedItem.attachments === 'undefined') {
          this.editedItem.attachments = []
        }
        this.editedItem.attachments.push({ name: '', href: '' })
      },
      saveItem () {
        this.$http.put('/events/' + this.editedItem._id, {
          event: {
            name: this.editedItem.name,
            date: this.editedItem.date,
            description: this.editedItem.description
          },
          attachments: this.editedItem.attachments
        })
        .then((response) => {
          this.isEditing = false
          toastr.success('Event edited!')
          console.log(response)
        })
        .catch(err => {
          console.log(err)
          return toastr.error('Błąd edycji. Sprawdź dane.')
        })
      },
      cancelEdit () {
        this.editedItem.name = this.beforeEdit.name
        this.editedItem.date = this.beforeEdit.date
        this.editedItem.description = this.beforeEdit.description
        this.editedItem.attachments = this.beforeEdit.attachments
        this.isEditing = false
      },
      deleteLink (attachment) {
        let index = _.indexOf(this.editedItem.attachments, attachment)
        this.editedItem.attachments.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
  .delete-icon {
    cursor: pointer;
  }
</style>
