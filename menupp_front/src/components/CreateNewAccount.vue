<template >
   <div class="q-pa-md bg-grey-10 text-white flex justify-center items-center" style="width: 100%; height: 100vh;">
   <form  @submit="handleRegisterAccount">
      <h5 class="text-bold text-center ">Create New Account</h5>
    <div class="q-gutter-y-md column" style="width: 300px;">
      <q-input v-model="createNewAccountData.email" type="email" color="white" standout="bg-grey-10 text-white" dark filled label="Email" required  >
      </q-input>
      <q-input v-model="createNewAccountData.password" type="password" color="white" standin="bg-grey-10 text-white" standout="bg-grey-10 text-white" dark filled label="Password" required >
      </q-input>
      <q-btn  type="submit" class="bg-green-7 text-bold" color="white" text-color="white" size="12px" label="Create new account" />
      <q-btn  @click="handleCreateNewAccount" type="button" class="bg-red-7 text-bold" color="white" text-color="white" size="12px" label="Go To Back" />
      <span class="text-center bg-red-7">{{ errorMsg }}</span>
    </div>
  </form>
  </div>
</template>

<script>

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  data () {
    return {
      createNewAccountData: {
        email: '',
        password: ''
      },
      errorMsg: ''
    }
  },
  props: {
    handleCreateNewAccount: Function
  },
  methods: {
    handleRegisterAccount (e) {
      e.preventDefault()
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.createNewAccountData.email, this.createNewAccountData.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          const errorMessage = error.message
          console.log(errorMessage)
          this.errorMsg = error.code
          if (this.errorMsg === 'auth/email-already-in-use') {
            this.errorMsg = 'The email has already been registered.'
          }
        })
      this.createNewAccountData.email = ''
      this.createNewAccountData.password = ''
    }
  }
}
</script>
