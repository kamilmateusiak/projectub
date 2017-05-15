<template>
  <div>
    <div class="main-banner">
      <h1>Lama Media - projectHub</h1>
    </div>
    <v-container style="margin-top: 50px;">
      <form @submit.prevent="submit">
        <v-row row>
          <v-col xs6 offset-xs3>
            <v-text-field
                v-model="email"
                label="E-mail"
                :rules="[validateEmail]"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row row>
          <v-col xs6 offset-xs3>
            <v-text-field
                v-model="password"
                type="password"
                append-icon="visibility_off"
                label="Password"
                :rules="[validatePassword]"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            style="margin: 0 auto;"
            primary
            v-bind:loading="loggingin"
            @click.native="login"
            v-bind:disabled="loggingin"
          >
            Login
          </v-btn>
        </v-row>
      </form>
    </v-container>
  </div>  
</template>

<script>
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
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.email) && this.email.length > 0) {
          return 'Wrong email!'
        } else {
          return true
        }
      },
      validatePassword () {
        if (this.password.length > 0 && this.password.length < 8) {
          return 'Password is too short'
        }
        return true
      }
    },
    methods: {
      login () {
        this.loggingin = true
        setTimeout(() => {
          this.loggingin = false
        }, 2000)
      }
    }
  }
</script>
