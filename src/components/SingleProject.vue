<template>
  <li class="timeline-node">
    <div class="timeline-stamp">{{ project.createdOn }}</div>
    <div class="timeline-name">
      <router-link tag="a" :to="'/project/' + project['.key']">{{ project.name }}</router-link>
    </div>
  </li>
</template>

<script>
  export default {
    props: ['project']
  }
</script>
