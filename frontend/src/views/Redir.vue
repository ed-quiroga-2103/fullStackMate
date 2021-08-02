<template>
  <div class="div">

  </div>
</template>

<script>



export default {
    created(){
        localStorage.clear()
        this.$router.push('/login');
    }

}
</script>

<style>

</style>