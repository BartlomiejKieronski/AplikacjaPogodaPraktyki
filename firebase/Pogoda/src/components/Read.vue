<script lang="ts">
import City from '../assets/city.json'
import { defineComponent, onMounted, ref} from 'vue'
import { useRouter} from 'vue-router'
import { getAdditionalUserInfo, getAuth, signOut } from '@firebase/auth';
import { collection, getDocs, doc, setDoc,addDoc} from 'firebase/firestore'
import { db } from '@/firebase'

export default defineComponent ({
    data(){
      return{
            city:City,
            lokacja: 0,
            query: '',
            weather: {},
           sprawdz:'tak',
           dane:[],
           miejsce :''
        }
    },
    setup(){
        const router = useRouter();
        const auth = getAuth();
        const uzytkownik = auth.currentUser
        const email = uzytkownik.email
        const dane= ref('')
        /*if(uzytkownik != null){
                    
                }
                else{
                   router.push('/')
                }*/
        const dodajDoBazy =  id  =>{
                 addDoc(collection(db, 'user', email, 'Miasta' ),{
                    IdMiasta : id
                 })
                 dane.value= ''
        }
        return{
            dodajDoBazy,
            dane
        }
    },
    methods:{
        //szukanie miasta do dodania do ulubionych
        arr(){
             var categoryArray = this.city
             this.dane = []
            for (var i = 0; i < categoryArray.length; i++) {
                if (categoryArray[i].name === this.miejsce) {
                    
                    var dane1 ={ 
                    lok: categoryArray[i].id,
                    miasto: categoryArray[i].name,
                    kraj: categoryArray[i].country,
                    lat: categoryArray[i].coord.lat,
                    lon: categoryArray[i].coord.lon
                    }
                    this.dane.unshift(dane1)
                    //console.log(this.dane)
                }

            }
            
            
        },
}
})
</script>
<template>

    <div class="d-flex justify-content-end p-3 ">
    
        <div class="container">
            <div class=" row d-flex justify-content-end">
                <div class="col d-flex justify-content-end">
                    <input type="text" class="form-control size" placeholder="Podaj miasto" v-model="miejsce">
                    <button @click="arr()" class="btn btn-primary">Znajdź</button>
                    
                </div>
            </div>
            <div class="border serch" v-if="dane!=null" v-for="miast in dane" v-bind:key="miast.lok">
            <div class="row ps-3 pt-4 sizing">
                <div class="col d-flex justify-content-center">
                <div class="row">
                <div class="col">
                <div class="row">
                    <div > Miasto: {{ miast.miasto }}</div>
                    </div></div>
                    <div > Kraj: {{ miast.kraj }}</div>
                    <div > lat: {{ miast.lat }}</div>
                    <div > lon: {{ miast.lon }}</div>   
                    <div>  lok: {{ miast.lok }}</div>
                    </div>   
                    <div > <button class=" btn btn-primary" @click="dodajDoBazy(miast.lok)" >Dodaj do obserwowanych</button></div>
                
            
            </div>
            </div>
            </div>
</div>

    </div>
    

</template>
<style scoped>
.serch{
    background-color:lightblue;
}
.color{
  background-color:lightblue;
  border-radius: 25px;
  max-width:500px
}
.size{
    width:400px
}
.sizing{
    max-width:400px
}
</style>