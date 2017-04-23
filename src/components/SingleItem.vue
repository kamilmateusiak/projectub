<template>
  <li class="timeline-node">
    <div class="timeline-stamp">{{ createdOn }}</div>
    <div class="timeline-name">{{ event.name }}</div>
    <div class="timeline-content">{{ event.description }}</div>
    <!--<div class="timeline-links" v-for="link in event.links">
      <a :href="link.href">{{ link.label }}</a>
    </div>-->
    <span class="item-icon"><i class="tiny material-icons" @click="editItem">mode_edit</i></span>
    <span class="item-icon"><i class="tiny material-icons" @click="removeItem">delete</i></span>
  </li>
</template>

<script>
  import { eventBus } from '../main'

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
        eventBus.$emit('removeEvent', this.editedEvent)
      }
    }
  }
</script>

<style scoped>
  .item-icon {
    cursor: pointer;
  }
</style>
