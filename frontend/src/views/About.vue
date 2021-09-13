<template>
  <div id="about">
    <body class="body">
      <div class="abouth">
        <h3>About</h3>
      </div>
      <main>
        <article>
          <section>
            <h1>Mate YA</h1>
            <p>
              Mate YA es un proyecto de la escuela de matemática del ITCR para
              facilicar el aprendizaje de los cursos de la escuela.
            </p>
            <p>
              En está página encontrará toda la materia, práctica y ejercicios
              necesarios para el curso.
            </p>
          </section>
        </article>
      </main>
    </body>
    <div class="foot">
      <footer>
        <h2>Proyeto de la Escuela de Matemática, ITCR</h2>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueKatex from "vue-katex";
import "katex/dist/katex.min.css";

Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
    throwOnError: false,
  },
});

export default {
  name: "App",
  components: {},
  data() {
    return {
      /* eslint-disable */
      procLatex: "",
      latex: "",
      renderComponent: true,
    };
  },
  methods: {
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
  },
  watch: {
    latex: function () {
      this.forceRerender();
      this.procLatex = "$$" + this.latex + "$$";
    },
  },
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
  padding: 0;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #87ceeb;
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
  -webkit-box-shadow: 1px 6px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 6px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 6px 5px 0px rgba(0, 0, 0, 0.25);
}
.container {
  display: flex;
  width: 100%;
}

.katex {
  font-size: 1.2em !important;
}

article {
  margin-left: 15%;
  float: left;
  padding: 100px;
  width: 70%;
  background-color: #f1f1f1;
}
.abouth {
  background-color: #6e6e77;
  width: 70%;
  margin-left: 15%;
  margin-top: 5%;
}
.body {
  background-color: #283747;
}
footer {
  margin-bottom: 1%;
  color: #f1f1f1;
}
</style>
