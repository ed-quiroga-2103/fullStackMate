<template>
    <div class="bg-dark-custom mainbody center-screen">
        <!-- contain mx-auto px-5 py-5 bg-contrast-custom position-absolute top-50 start-50 translate-middle font-light-custom rcorners -->
        <form
            v-on:submit.prevent="onLogin"
            class="contain px-4 bg-contrast-custom font-light-custom rcorners"
        >
            <div class="mb-3">
                <label
                    for="exampleInputEmail1"
                    class="form-label font-light-custom"
                    >Email address</label
                >
                <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                </div>
            </div>
            <div class="mb-3">
                <label
                    for="exampleInputPassword1"
                    class="form-label font-light-custom"
                    >Password</label
                >
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>
            <div class="mb-3 form-check">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                />
                <label
                    class="form-check-label font-light-custom"
                    for="exampleCheck1"
                    >Remember Username</label
                >
            </div>
            <button type="submit" class="btn btn-primary">Log In!</button>
        </form>
    </div>
</template>

<script>
import VueCookies from 'vue-cookies';

var salt = '1234123412341234';
var saltBuffer = new Buffer(salt).toString('hex');
var crypto = require('crypto');
var axios = require('axios');

export default {
    mounted() {},

    methods: {
        onLogin() {
            var email = document.getElementById('exampleInputEmail1').value;
            var pass = document.getElementById('exampleInputPassword1').value;

            var cryptoPass = crypto.pbkdf2Sync(
                new Buffer(pass),
                new Buffer(saltBuffer, 'hex'),
                1000,
                32,
                'sha1'
            );

            var usr = {
                user: email,
                pass: cryptoPass.toString()
            };

            var config = {
                method: 'post',
                url: 'http://localhost:8000/login',
                headers: {
                    Authorization: 'Basic QWRtaW46MTIzNDU=',
                    'Content-Type': 'application/json'
                },
                data: usr
            };

            axios(config)
                .then(response => {
                    VueCookies.set('session_token', response.data.token);

                    var status = response.data.status;

                    if (!status) {
                        console.log('Wrong user or password');
                    } else {
                        var info = response.data.info; //Ask later, move it where its needed
                        var user = response.data.user;

                        //Should we save the graphs as states??
                        //Yes we should
                        //Important information used across components is stored in Vuex Store
                        this.$store.commit('changeInfoState', info);
                        this.$store.commit('changeUserState', user);
                        this.$store.commit('changeLogState', '1');

                        this.$router.push('/home');
                    }
                })
                .catch(err => {
                    console.log('[Login.vue] Error: ', err);
                });
        }
    }
};
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
.mainbody {
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
