<template>
  <v-layout row class="timeline-container">
    <v-flex xs6>
      <edit-item-modal></edit-item-modal>
      <h1>
        {{ project.name }}
      </h1>
      <ol class="timeline">
        <single-item v-for="event in project.events" :event="event" :key="event._id"></single-item>
      </ol>
      <v-btn light router :to="'/project/' + project.name + '/new'" class="blue add-new-btn">Dodaj</v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
  import SingleItem from '../components/SingleItem.vue'
  import EditItemModal from '../components/EditItemModal.vue'
  import ProjectTeam from '../components/ProjectTeam.vue'
  import { eventBus } from '../main'
  import _ from 'lodash'

  export default {
    name: 'app',
    data () {
      return {
        name: this.$route.params.name,
        project: {}
      }
    },
    computed: {
      projectName () {
        if (typeof this.project[1] === 'undefined') {
          return ''
        }
        return this.project[1]['.value']
      }
    },
    components: {
      SingleItem,
      EditItemModal,
      ProjectTeam
    },
    created () {
      this.$http.get(`projects/${this.name}`).then(res => {
        return res.data
      })
      .then(data => {
        data.events = _.sortBy(data.events, [(event) => {
          return new Date(event.date)
        }]).reverse()
        this.project = data
      })
      .catch(err => {
        console.log(err)
      })
      eventBus.$on('removeEvent', (item) => {
        this.project.events = _.pull(this.project.events, item)
      })
    }
  }
</script>

<style>
  .add-new-btn {
    position: fixed;
    top: 160px;
    right: 20px;
  }

  .slide-enter {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in .7s ease-out forwards;
    transition: opacity .7s;
  }
  .slide-leave-to {
    opacity: 0;
  }
  .slide-leave-active {
    animation: slide-out .7s ease-out forwards;
    transition: opacity .7s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(30px);
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(30px)
    }
  }
</style>
