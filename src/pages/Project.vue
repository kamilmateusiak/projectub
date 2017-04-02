<template>
  <div class="row timeline-container">
    <div class="col s12 m8 l6">
      <transition name="slide" type="animation">
        <edit-item-modal v-if="isEditing" :style="modalStyle" :item="editedItem"></edit-item-modal>
      </transition>
      <h1>
        {{ projectName }}
      </h1>
      <ol class="timeline">
        <single-item v-for="(item, index) in items" :item="item" :key="index"></single-item>
      </ol>
      <router-link tag="button" class="btn light-blue darken-3 add-new-btn" :to="'/project/' + project_key + '/new'">Dodaj</router-link>
    </div>
  </div>

</template>

<script>
  import SingleItem from '../components/SingleItem.vue'
  import db from '../firebase'
  import EditItemModal from '../components/EditItemModal.vue'
  import { eventBus } from '../main'
  import toastr from 'toastr'

  export default {
    name: 'app',
    data () {
      return {
        project_key: this.$route.params.id,
        isEditing: false,
        editedItem: {}
      }
    },
    computed: {
      modalStyle () {
        if (this.isEditing) {
          return {
            display: 'block',
            zIndex: '100'
          }
        }
        return {}
      },
      projectName () {
        if (typeof this.project[1] === 'undefined') {
          return ''
        }
        return this.project[1]['.value']
      }
    },
    components: {
      SingleItem,
      EditItemModal
    },
    firebase () {
      return {
        items: db.ref(this.project_key),
        project: db.ref('projects').child(this.project_key)
      }
    },
    created () {
      eventBus.$on('editItem', (data) => {
        this.editedItem = data
        this.isEditing = true
      })
      eventBus.$on('itemWasEdited', (data) => {
        return this.$firebaseRefs.items.child(data.key).set(data.item)
                .then(() => {
                  this.isEditing = false
                  toastr.success('Edycja zakończona sukcesem!')
                })
                .catch((err) => {
                  toastr.error('Oops, coś się nie udało')
                  console.log(err)
                })
      })
      eventBus.$on('editWasCanceled', () => {
        this.isEditing = false
      })
      eventBus.$on('removeItem', (item) => {
        return this.$firebaseRefs.items.child(item['.key']).remove()
                .then(() => {
                  toastr.success('Item usunięty!')
                })
                .catch((err) => {
                  toastr.error('Oops, coś nie poszło')
                  console.log(err)
                })
      })
    }
  }
</script>

<style>
  .add-new-btn {
    position: fixed;
    top: 130px;
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
