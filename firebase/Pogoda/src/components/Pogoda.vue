<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeMount } from 'vue'
import { getAuth, signOut  } from"firebase/auth";
import { useRouter} from 'vue-router'
import City from '../assets/city.json'
import { collection, getDocs, doc, setDoc,addDoc, onSnapshot} from 'firebase/firestore'
import { db } from '@/firebase'

export default defineComponent({
    data(){
        const router = useRouter();
        return{
            router
        }
    },
    setup(){
        const router = useRouter();
        const categoryArray = City
        const current = new Date();
        console.log(current)
        const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
        const obserwowaneMiasta = ref([])
        const dana = ref([])
        const prob = ref([])
        const auth = getAuth();
        const uzytkownik = auth.currentUser;
        //console.log(uzytkownik)
        const email = uzytkownik.email
        //console.log(email)
        const danePogody = ref([])
       //sprawdzanie czy uzytkownik jest zalogowany
       
            
            onMounted(async ()=>{
                if(email != null){
                
                }
                else{
                   router.push('/')
                }
                //polaczenie z bazą
                onSnapshot(collection( db , 'user', `${email}`,'Miasta'), (querySnapshot)=>{
                    let dan =[]
                    let dane = []
                    
                    querySnapshot.forEach((doc)=>{
                        const  obserwowane = {
                            miasta: doc.data().IdMiasta,
                         }
                        dane.push(obserwowane)
                        //console.log(dane)
                    })
                    for( var i = 0; i< dane.length; i++) {
                        dan.push(dane[i].miasta)
                    }
                    //console.log(dan)
                    obserwowaneMiasta.value = dan
                    //console.log(obserwowaneMiasta)
                    let jakiesDane = []
                    var getData = ()=>{
                        //połączenie z api OpenWeatherMaps 
                     for(var v = 0; v< dan.length; v++){
                            for (var i = 0; i < categoryArray.length; i++) {
                                if (categoryArray[i].id === dan[v]) {
                                    var lat = categoryArray[i].coord.lat
                                    var lon = categoryArray[i].coord.lon
                                    var apiKey= '15a3d043ce52dbf8c20c1d273881717c'
                                   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pl&units=metric&appid=${apiKey}`)
                                    .then(res=>{
                                        return res.json();
                                    }).then(setResults=>{
                                        jakiesDane.push(setResults)
                                      //  console.log(jakiesDane)
                                 })
                                 }
                                }
                             }
                             //dodawanie do bazy informacji o temperaturze i wilgotności
                            var dodajDoBazy =  () =>{
                                for (var m = 0; m< jakiesDane.length; m++){
                            addDoc(collection(db, 'user', email,'Temperatury'  ),{
                                data: date,
                                Temperatura: jakiesDane[m].main.temp,
                                id: jakiesDane[m].id,
                                dataNow: Date.now()
                            })
                            addDoc(collection(db, 'user', email, 'Wilgotnosc' ),{
                                 data: date,
                                 Wilogtnosc: jakiesDane[m].main.humidity,
                                 id: jakiesDane[m].id,
                                 dataNow: Date.now()
                            })
                        }
                         }
                         
                    dodajDoBazy()
                        danePogody.value=jakiesDane
                        jakiesDane = []
                        //console.log(jakiesDane)
            }
            //
            var x= 0
            var intervalID = setInterval(function () {

                //inicjalizacja funkcji do 1 wyświetlenia danych
            getData()

                if (++x === 2) {
                window.clearInterval(intervalID);
                }
                }, 1000);
                //inicjalizacja funkcji pobierania api i dodawania informacji do bazy co 60 sekund
                setInterval(getData, 60000)
            })
            })
    return{
        obserwowaneMiasta,
        dana,
        danePogody,
        uzytkownik
    }
    },
    methods:{
       //wyloguj
        logout(){
            const auth = getAuth();
            signOut(auth).then(() => {
            this.router.push('/')
            }).catch((error) => {
                console.log('Error in logout')
            });
        },
        
        
    }
})

</script>
<template>

    <div class="d-flex pt-5 ps-5">
       
        <div class="container">
    
        <div class="row p-5" >
        
        <div class="col p-2 size" v-if="danePogody != null" v-for=" miasta in danePogody" v-bind:key="miasta.id">
        <div class="p-2 color">
        
        <div class="d-flex justify-content-center"><h3>{{ miasta.name }}</h3></div>
        <div class="d-flex justify-content-center"><h1> {{ Math.round(miasta.main.temp) }} </h1></div>
        <div><h4>Wilgotność: {{ miasta.main.humidity }}</h4></div>
        <div> <router-link :to="`Chart/${miasta.id}`">wykresy wilgotności i temperatury {{ miasta.name }}</router-link></div>
        </div>
        </div>
        <div v-else>
        
        </div>
        </div> 

        
    </div>
    </div>

</template>

<style scoped>
.size{
    min-width:200px;
    max-width:300px
}
.color{
background-color:lightblue !important;
border-radius: 25px;
opacity: 80%;


}
</style>