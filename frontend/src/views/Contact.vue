<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="content-section">
            <h2>Lista de Contactos</h2>
            <ul class="list-group">
              <a class="list-group-item list-group-item-action"
                >Profesor 1 - Correo profesor@itcr.ac.cr</a
              >
              <a class="list-group-item list-group-item-action"
                >Profesor 2 - Correo profesor@itcr.ac.cr</a
              >
            </ul>
          </div>
        </div>
        <!-- En caso de tener nombre - Correo
         <div class="col-md-4">
          <div class="content-section">
            <h2>Correos</h2>
            <ul class="list-group">
              <a class="list-group-item list-group-item-action">Profesor 1</a>
              <a class="list-group-item list-group-item-action">Profesor 2</a>
            </ul>
          </div>
        </div> -->
      </div>
    </div>

    <div class="container">
      <h1>Contacto</h1>
      <div class="content-section">
        <h2>¿Tienes alguna pregunta?</h2>
        <h3>¡Escribenos!</h3>
        <ul class="list-group">
          <a class="list-group-item list-group-item-action"
            >Correo estudiantec: estudiante@estudiantec.cr</a
          >
          <a class="list-group-item list-group-item-action"
            >Número: 8888-8888</a
          >

          <div class="form-group col-md-03">
            <label> O deja tu comentario:</label>
            <input type="mail" class="form-control" formControlName="comment" />
          </div>
          <div class="form-group col-md-auto">
            <a href="/home" class="button btn btn-dark btn-primary-spacing"
              >Enviar</a
            >
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  components: {},
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    show() {},
  },
};
</script>

<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.container {
  margin-top: 5%;
  background-color: #6e6e77;
}
</style>