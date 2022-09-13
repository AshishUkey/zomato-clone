import FoodCard from "../components/FoodCard.vue";

export default{
    components: {
        "food-card": FoodCard,
    },
    data(){
        return{
            loading:false,
            error:false,
            errorMessage:'',
        }  
    },
    methods:{
        alert(){
            console.log("SHOW ME AN ALER")
        }
    },
    created(){
        console.log("CALLED CREATED FROM MIXIN")
        this.$data.loading = true;
        this.fetchFoods()   
    },
    beforeRouteLeave(to,from,next){
        console.log("Local gaurd")
        console.log(from);
        console.log(to);
        if(!this.$data.showForm){
            next();
        } else {
            console.log("...")
        }
       
    },
    beforeRouteEnter(to,from,next){
        console.log("Local gaurd")
        console.log(from);
        console.log(to);
        next();
    },
};