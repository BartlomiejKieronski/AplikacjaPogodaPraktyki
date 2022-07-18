<script  lang="ts">
import {reactive, ref, onMounted} from 'vue'
import { useRouter} from 'vue-router'
import { defineComponent } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signOut  } from"firebase/auth";
import firebase from "../firebase"

firebase
export default defineComponent({
    setup(){
        
        const router = useRouter();
   return{router, }},
    
   data(){
    const router = useRouter();
    const auth = getAuth();
    return{
        email: '',
        password: '',
        Repeatpassword:'',
        router,
        auth,
        ErrorMessage:''
    }
   },
   methods:{
    //sprawdzanie poprawnosci wpisanych haseł
    SamePasswords(){
      if(this.password === this.Repeatpassword){
        this.createUserWithEmailAndPassword()
      }
      else{
        this.ErrorMessage= "Hasła nie są identyczne!"
      }
    },
    //tworzenie użytkownika w firebase
    createUserWithEmailAndPassword(){
        createUserWithEmailAndPassword(this.auth, this.email, this.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.router.push({name: 'pogoda'})
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode)
    console.log(errorMessage)
  });
    },
    //logowanie 
    logout(){
          const auth = getAuth();
    signOut(auth).then(() => {
      this.router.push('/')
    }).catch((error) => {
  // An error happened.
});
    }
   }
})
</script>
<template>
    <div class="d-flex justify-content-center border colors ">
    <div class="container">
    <div class="container">
    <div class="d-flex justify-content-center  ">
    <div class="row">
    <div class="col d-flex justify-content-center pt-2">
    <img alt="Vue logo" class="logo" src="@/assets/logo.webp" width="125" height="125" /><br>
    </div>
    
    <form @submit.prevent="SamePasswords">
    <div class="col pt-3">
    <input type="text" class="form-control" placeholder="E-mail" v-model="email">
    </div>
    <div class="col pt-2">
    <input type="password" class="form-control" placeholder="Hasło" v-model="password">
    </div>
    <div class="col pt-2">
    <input type="password" class="form-control" placeholder="Powtórz hasło" v-model="Repeatpassword">
    </div>
    <div class="row pt-2">
    <div class="d-flex justify-content-center">
    <div class="pb-2">
    <button type="submit" class="btn btn-primary">Zarejestruj</button>
    </div>
    
    </div>
    </div>
    </form>
    <div class="row pt-2">
    <div class="d-flex justify-content-center">
    <div class="">Masz już konto? <router-link to="/">Zaloguj się</router-link></div>
    </div>
    </div>
    <div>{{ ErrorMessage }}</div>
    </div>
    </div>
    </div>
    </div>
    </div>
</template>
<style scoped>
.colors{
  background-color:lightblue;
  border-radius: 25px;
  max-width:500px
}
</style>