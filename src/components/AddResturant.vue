<template>

        <button @click="show = !show">Add Resturant</button>
        <Transition name="slide">
            <span v-if="show">Above button is disabled as you are not an admin</span>
        </Transition>

</template>
<script>

export default {
 data(){
    return{
        show:false
    }
 },
 methods:{
    warnButtonIsDisabled(){
        this.disabled = true;
        setTimeout(()=>{
            this.disabled = false
        },1500)
    }
 }
};
</script>

<style>

  .slide-enter-active{
    transition:all 0.5s ease-out;
  }

  .slide-leave-active{
    transition:all 0.5s cubic-bezier(1, 0.5, 0.8, 1)
  }

  .slide-enter-from
  .slide-leave-to{
    transform: translateX(30px);
    opacity: 0;
  }


.slide-enter-active {
  animation: modal 0.3s ease-out;
}

.slide-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}


</style>