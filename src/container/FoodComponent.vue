<template>
    <div>
        <ul>
            <li v-for="(food,indx) in foods" :key="indx">
                <!--<router-link :to='getFoodId(food.id)'>{{food.name}}</router-link>-->
                <router-link :to="{name:'foodDetails',params:{'foodId':food.id}}">{{food.name}}</router-link>
            </li>
        </ul>
        <button @click="goToHome">Go to home</button>
        
    </div>
</template>

<script>
//import axios from 'axios';

export default{

    data(){
        return {
            foods: [
                {
                    id:"1-biryani",
                    name:'Biriyani',
                    cuisine:'Dinner'
                },
                {
                    id:"1-vada-pav",
                    name:'Vada pav',
                    cuisine:'Breakfast'
                },
                {
                    id:"1-idly",
                    name:'Idly',
                    cuisine:'Breakfast'
                },
                {
                    id:"1-rice-sambar",
                    name:'Rice Sambar',
                    cuisine:'Lunch'
                }
            ]
        }
    },
    methods:{
        getFoodId(id){
            return '/food/'+id
        },
        goToHome(){

            this.$http.get('https://test-b4b07-default-rtdb.firebaseio.com/food.json').then((response) => {
                console.log(response.data);
            });

            /*fetch('https://test-b4b07-default-rtdb.firebaseio.com/food.json', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                }
                body: JSON.stringify({
                name: 'Idly',
                cost: 200,
                cuisine: 'Breakfast',
                image:'https://github.com/DivyashantKumar/staticWebPageCollection/blob/main/images/1image.png?raw=true'
                }),
            }).then(res => res.json()).then(res => {
                console.log(res)
            });*/
            this.$router.push('/')
        }
    }
}

</script>


<style scoped>
    div {
        width: 100%;
        min-height: 1800px;
        background-color: #11005c;
        border: solid 1px #ccc;
        position: relative;
    }
    button{
        position: absolute;
        bottom: 0px;
        right: 30px;
    }
</style>