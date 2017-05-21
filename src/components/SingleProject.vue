<template>
  <li class="timeline-node">
    <div class="timeline-stamp">{{ createdOn }}</div>
    <div class="timeline-name">
      <router-link tag="a" :to="'/project/' + project.name">{{ project.name }}</router-link>
    </div>
  </li>
</template>

<script>
  export default {
    props: ['project'],
    computed: {
      createdOn () {
        if (this.project.date) {
          return new Date(this.project.date).toLocaleDateString('pl-PL')
        }
        return ''
      }
    }
  }
</script>
