<template>
  <li class="timeline-node">
    <div class="timeline-stamp">{{ item.createdOn }}</div>
    <div class="timeline-name">{{ item.name }}</div>
    <div class="timeline-content">{{ item.content }}</div>
    <div class="timeline-links" v-for="link in item.links">
      <a :href="link.href">{{ link.label }}</a>
    </div>
    <span class="item-icon"><i class="tiny material-icons" @click="editItem">mode_edit</i></span>
    <span class="item-icon"><i class="tiny material-icons" @click="removeItem">delete</i></span>
  </li>
</template>

<script>
  import { eventBus } from '../main'

  export default {
    props: ['item'],
    data () {
      return {
        editedItem: this.item
      }
    },
    methods: {
      editItem () {
        eventBus.$emit('editItem', this.editedItem)
      },
      removeItem () {
        eventBus.$emit('removeItem', this.editedItem)
      }
    }
  }
</script>

<style scoped>
  .item-icon {
    cursor: pointer;
  }
</style>
