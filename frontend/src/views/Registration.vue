<template>
    <div class="bg-dark-custom mainbody center-screen">
        
        
        <form v-on:submit.prevent="onClick" class="contain px-5 bg-contrast-custom font-light-custom rcorners">
            <div>
                <h3 class="form-label font-light-custom">Registration</h3>
            </div>
        <div class="mb-3">
            <label for="InputEmail1" class="form-label font-light-custom">Email address</label>
            <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="InputName" class="form-label font-light-custom">First Name</label>
            <input type="text" class="form-control" id="InputName">
        </div>
        <div class="mb-3">
            <label for="InputLastName" class="form-label font-light-custom">Last Name</label>
            <input type="text" class="form-control" id="InputLastName">
        </div>
        <div class="mb-3">
            <label for="InputPassword1" class="form-label font-light-custom">Password</label>
            <input type="password" class="form-control" id="InputPassword1">
        </div>
        <div class="mb-3 no-arrows">
            <label for="InputID" class="form-label font-light-custom no-arrows">ID</label>
            <input type="number" class="form-control no-arrows" id="InputID">
        </div>

        <button type="submit" class="btn btn-primary">Sign Up!</button>
    </form>
  </div>
</template>

<script>
var salt = '1234123412341234';
var saltBuffer = new Buffer(salt).toString('hex');
var crypto = require('crypto');
var axios = require('axios');

export default {
    data() {
        return {
              
        }
    },
    methods:{
        onClick(){
            var email = document.getElementById('InputEmail1').value;
            var pass = document.getElementById('InputPassword1').value;
            // var firstName = document.getElementById('InputName').value;
            // var lastName = document.getElementById('InputLastName').value;
            // var id = document.getElementById('InputID').value;

            
            var cryptoPass = crypto.pbkdf2Sync(new Buffer(pass), new Buffer(saltBuffer, 'hex'), 1000, 32, 'sha1');

            
            var usr = {
                'user': email,
                'pass': cryptoPass.toString()
            };

            var usrString = JSON.stringify(usr);
            var data = usrString;

            var config = {
            method: 'post',
            url: 'http://localhost:8000/registration',
            headers: { 
                'x-access-token': '', 
                'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                'Content-Type': 'application/json'
            },
                data: data
            };

            axios(config).then(response=>{

                    console.log(response)
                    this.$router.push('/');
                    

                
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
  padding-bottom: 3%;
  display: flex;  
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
}
.mainbody{
  position: static;
  height: 100%;
  
}

.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 4%;
  margin-bottom: 4%;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}


</style>