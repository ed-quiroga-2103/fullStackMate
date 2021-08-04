<template>
  <div id="about">
      <div class="abouth">
          <h3>About</h3>
      </div>
      
      <article>
        <h1>London</h1>
        <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
        <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
      </article>

      <div>
        <h1>Josu</h1>
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

article {
  margin-left: 15%;
  float: left;
  padding: 100px;
  width: 70%;
  background-color: #f1f1f1;
  height: 400px; /* only for demonstration, should be removed */
}
.abouth{
  background-color: #6e6e77;
  width: 70%;
  margin-left:15%; 
  margin-top: 5%;
}

.footer {
  background-color: #777;
  padding: 10px;
  text-align: center;
  color: white;
}


</style>
