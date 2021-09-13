<template>
    <mainGraph/>
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
