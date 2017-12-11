<template>
  <div>
    <div class="main-banner">
      <h1>Lama Media - projectHub</h1>
    </div>
    <v-container style="margin-top: 50px;">
      <form>
        <v-layout row>
          <v-flex xs6 offset-xs3>
            <v-text-field
                v-model="name"
                label="Name"
                :rules="[validateName]"
              ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6 offset-xs3>
            <v-text-field
                v-model="surname"
                label="Surname"
                :rules="[validateSurname]"
              ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6 offset-xs3>
            <v-text-field
                v-model="email"
                label="E-mail"
                :rules="[validateEmail]"
              ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6 offset-xs3>
            <v-text-field
                v-model="password"
                type="password"
                append-icon="visibility_off"
                label="Password"
                :rules="[validatePassword]"
              ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-btn
            style="margin: 0 auto;"
            light
            class="blue"
            v-bind:loading="registeringin"
            @click.native="register"
            v-bind:disabled="registeringin"
          >
            Register
          </v-btn>
        </v-layout>
      </form>
      <v-layout>
        <p class="text--center">If you have account try <router-link tag="a" :to="{name: 'login'}">login</router-link>!</p>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import toastr from 'toastr'

  export default {
    name: 'app',
    data () {
      return {
        name: '',
        surname: '',
        email: '',
        password: '',
        registeringin: false
      }
    },
    computed: {
      validateName () {
        if (this.name.length === 0) {
          return 'Required!'
        } else {
          return true
        }
      },
      validateSurname () {
        if (this.surname.length === 0) {
          return 'Required!'
        } else {
          return true
        }
      },
      validateEmail () {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/
        if (this.email.length === 0) {
          return 'Required!'
        } else if (!re.test(this.email) && this.email.length > 0) {
          return 'Wrong email!'
        } else {
          return true
        }
      },
      validatePassword () {
        if (this.password.length === 0) {
          return 'Required!'
        } else if (this.password.length > 0 && this.password.length < 6) {
          return 'Password is too short'
        }
        return true
      }
    },
    mounted () {
      this.$store.dispatch('logout')
    },
    methods: {
      register () {
        if (this.validateName !== true ||
            this.validateSurname !== true ||
            this.validateEmail !== true ||
            this.validatePassword !== true) {
          return toastr.error('Sprawdź swoje dane!')
        }
        this.registeringin = true
        return this.$http.post('/users/register', {
          email: this.email,
          password: this.password,
          name: this.name,
          surname: this.surname
        })
        .then(res => {
          toastr.success('Udało się! Możesz się zalogować')
          this.$router.push('/login')
        })
        .catch(e => {
          toastr.error('Wystąpił błąd. Sprawdź dane lub skontaktuj się z administratorem.')
          console.log(e)
          this.registeringin = false
        })
      }
    }
  }
</script>
