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
        <v-layout row>
          <v-btn
            style="margin: 0 auto;"
            light
            class="blue"
            v-bind:loading="loggingin"
            @click.native="login"
            v-bind:disabled="loggingin"
          >
            Login
          </v-btn>
        </v-layout>
      </form>
      <v-layout row>
        <p class="text--center">Don't have account? <router-link tag="a" :to="{name: 'register'}">Sigup</router-link></p>
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
        email: '',
        password: '',
        loggingin: false
      }
    },
    computed: {
      validateEmail () {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/
        if (!re.test(this.email) && this.email.length > 0) {
          return 'Wrong email!'
        } else {
          return true
        }
      },
      validatePassword () {
        if (this.password.length > 0 && this.password.length < 6) {
          return 'Password is too short'
        }
        return true
      }
    },
    mounted () {
      this.$store.dispatch('logout')
    },
    methods: {
      login () {
        this.loggingin = true
        this.$http.post('/users/login', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log(res)
          let user = res.data
          localStorage.setItem('token', res.headers['x-auth'])
          localStorage.setItem('email', user.email)
          localStorage.setItem('_id', user._id)
          this.$store.dispatch('authenticate', user._id)
          this.$router.push('/')
        })
        .catch(e => {
          console.log(e)
          return toastr.error('Sprawdź swoje dane!')
        })
        this.loggingin = false
      }
    }
  }
</script>

<style>
  .text--center {
    margin: 20px auto;
  }
</style>
