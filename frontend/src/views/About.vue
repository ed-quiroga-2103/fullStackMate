<template>
  <div id="app">
    <input v-model="latex" placeholder="Insert Equation in LaTex">
    <p>Latex is: {{ latex }}</p>
    <p>Equation is</p>
    <div v-if="renderComponent" v-katex:auto class="katex">
      {{procLatex}}
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
    throwOnError: false
  }
});

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      /* eslint-disable */
      procLatex:'',
      latex: '',
      renderComponent: true,

    }
  },
  methods:{
    forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      }
    },
    watch: {
        latex: function () {
        this.forceRerender()
        this.procLatex = "$$" + this.latex + "$$";
      }
    }
  };
</script>

<style scoped>
        
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding:0;
  
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #87CEEB;
}

header {
  width: 100vw;
  background-color: #eba487;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 0px 0px 5px 5px;
  -moz-border-radius: 0px 0px 5px 5px;
  -webkit-border-radius: 0px 0px 5px 5px;
  border: 0px solid #000000;
  -webkit-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.25);
  box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.25);
}
.container {
    display: flex;
    width: 100%;
}

.katex { font-size: 1.2em !important; } 

</style>
