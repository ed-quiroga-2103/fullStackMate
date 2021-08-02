<template>
  <div>
    <mainGraph/>
  </div>
</template>

<script>

import mainGraph from './mainGraph.vue'

export default {
  name: 'TutorEnv',
  props: {
    msg: String
  },
  components: {
        mainGraph
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
