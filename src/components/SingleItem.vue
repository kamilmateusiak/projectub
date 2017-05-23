<template>
  <li class="timeline-node">
    <div class="timeline-stamp">{{ createdOn }}</div>
    <div class="timeline-name">{{ event.name }}</div>
    <div class="timeline-content">{{ event.description }}</div>
    <div class="timeline-links" v-for="attachment in event.attachments">
      <a :href="attachment.href">{{ attachment.name }}</a>
    </div>
    <v-btn small icon slot="activator" outline class="blue--text item-icon" @click.native="editItem"><v-icon class="blue--text text--darken-2">mode_edit</v-icon></v-btn>
    <v-btn small icon outline class="blue--text item-icon" @click.native="removeItem"><v-icon class="blue--text text--darken-2">delete</v-icon></v-btn>
  </li>
</template>

<script>
  import { eventBus } from '../main'
  import toastr from 'toastr'

  export default {
    props: ['event'],
    data () {
      return {
        editedEvent: this.event
      }
    },
    computed: {
      createdOn () {
        if (this.event.date) {
          return new Date(this.event.date).toLocaleDateString('pl-PL')
        }
        return ''
      }
    },
    methods: {
      editItem () {
        eventBus.$emit('editEvent', this.editedEvent)
      },
      removeItem () {
        this.$http.delete('/events/' + this.event._id)
          .then((response) => {
            console.log(response)
            this.$router.push({path: '/projects'})
            eventBus.$emit('removeEvent', this.event)
            toastr.success('Item usunięty!')
          })
          .catch(err => {
            toastr.error(err)
          })
      }
    }
  }
</script>

<style scoped>
  .item-icon {
    cursor: pointer;
    margin: 10px 0;
  }
</style>
