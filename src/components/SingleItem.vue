<template>
  <li class="timeline-node">
    <div class="timeline-stamp">{{ createdOn }}</div>
    <div class="timeline-name">{{ event.name }}</div>
    <div class="timeline-content">{{ event.description }}</div>
    <div class="timeline-links" v-for="attachment in event.attachments">
      <a :href="attachment.href">{{ attachment.name }}</a>
    </div>
    <span class="item-icon"><v-icon class="blue--text text--darken-2" @click.native="editItem">mode_edit</v-icon></span>
    <span class="item-icon"><v-icon class="grey--text text--darken-2" @click.native="removeItem">delete</v-icon></span>
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
  }
</style>
