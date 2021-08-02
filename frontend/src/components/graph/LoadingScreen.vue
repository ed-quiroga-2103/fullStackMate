<template>
  <div :class="{ load: true, fadeout: !isLoading }">
    <div class = "centered">
    <div class="bg-contrast-custom center-screen font-light-custom">
      LOADING
      <div class="spinner-grow font-light-custom" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["isLoading"]
};
</script>

<style scoped>


.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
  .load {
    background-color: #3C1874;
    bottom: 0;
    color: white;
    display: block;
    font-size: 32px;
    left: 0;
    overflow: hidden;
    padding-top: 10vh;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
    display: flex;
    flex-direction: column;
  }

  .fadeout {
    animation: fadeout 1s 1500ms forwards;
  }

  @keyframes fadeout {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }

  .centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}


</style>
