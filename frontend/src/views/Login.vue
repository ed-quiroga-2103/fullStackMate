<template>
    <div class="bg-dark-custom mainbody center-screen">
      <!-- contain mx-auto px-5 py-5 bg-contrast-custom position-absolute top-50 start-50 translate-middle font-light-custom rcorners -->
      <form v-on:submit.prevent="onClick" class="contain px-4 bg-contrast-custom font-light-custom rcorners">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label font-light-custom">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label font-light-custom">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label font-light-custom" for="exampleCheck1">Remember Username</label>
        </div>
        <button type="submit" class="btn btn-primary">Log In!</button>
    </form>
  </div>
</template>

<script>
var salt = '1234123412341234';
var saltBuffer = new Buffer(salt).toString('hex');
var crypto = require('crypto');
var axios = require('axios');

import {setWithExpiry} from "../util/utilities.js"

export default {
    mounted(){
      this.$store.commit("changeLogState", "0");

      console.log(this.$store.state.logged);

    },
    data() {
        return {
              
        }
    },
    methods:{
        onClick(){
            var email = document.getElementById('exampleInputEmail1').value;
            var pass = document.getElementById('exampleInputPassword1').value;
            
            var cryptoPass = crypto.pbkdf2Sync(new Buffer(pass), new Buffer(saltBuffer, 'hex'), 1000, 32, 'sha1');

            
            var usr = {
                'user': email,
                'pass': cryptoPass.toString()
            };

            var usrString = JSON.stringify(usr);
            var data = usrString;

            var config = {
            method: 'post',
            url: 'http://localhost:8000/login',
            headers: { 
                'x-access-token': '', 
                'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                'Content-Type': 'application/json'
            },
                data: data
            };

            axios(config).then(response=>{
                //Setteado para que el token expire en 3 horas.
                //Si el token expira, el sistema debería redireccionar a la pagina de login, dando un mensaje de alerta que la sesión expiró.
                //Importante: Programar una función para que el tiempo se reinicie cada vez que se interactua con un componente nuevo (SIN REALIZAR)
                setWithExpiry('token', response.data.token, 10800000);

                if(response.data.data != "Wrong password"){

                    var status = response.data.status;

                    if(!status){
                      console.log("Wrong user or password");
                    }
                    else{
                      var data = response.data.data;
                      var info = response.data.info;
                      var user = response.data.user;
                    
                      var dataStr = JSON.stringify(data);
                      var infoStr = JSON.stringify(info);
                      var userStr = JSON.stringify(user);


                      console.log(data);
                      console.log(info);
                      console.log(user);
                    
                    
                      localStorage.setItem('mainGraph', dataStr);
                      localStorage.setItem('info', infoStr);
                      localStorage.setItem('currentGraphId', 'main');
                      localStorage.setItem('currentGraph', dataStr);
                      localStorage.setItem('user', userStr);

                      this.$store.commit("changeLogState", "1");

                      this.$router.push('/home');
                      
                    }
                }
            });

        }
    }
        
}
</script>

<style scoped>

.contain {
  min-width: 360px;
  width: 35%;
  padding-top: 3%;
  padding-bottom: 5%;
  display: flex;  
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: left;
  text-align: left;
}
.mainbody{
  height: 100%;
  width: 100%;
}


.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10%;
}

</style>