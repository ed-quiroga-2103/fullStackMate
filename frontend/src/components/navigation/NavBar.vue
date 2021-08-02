<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-contrast-custom nav-height">
        <div class="container-fluid">
            <a class="navbar-brand navbar-brand-font">Instituto Tecnológico de Costa Rica</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div v-if="this.$store.state.logged" class="navbar-nav">
                <div class="navbar-nav padded">
                    <router-link class="nav-link" active-class="active" to="/home" v-on:click="onClickHome">Home</router-link>
                    <router-link class="nav-link" active-class="active" to="/about">About</router-link>
                    <router-link class="nav-link" active-class="active" to="/contact">Contact</router-link>
                    <router-link class="nav-link" active-class="active" to="/registration">Sign Up</router-link>
                    <a class="nav-link disabled" tabindex="-1" aria-disabled="true">Disabled</a>
                    
                </div>
                
            </div>
            <div class="d-flex ms-auto p-2" v-else>
                <button class="btn btn-outline-primary padR" type="submit" v-on:click="onClickSignUp">Sign Up!</button>
                <button class="btn btn-outline-primary" type="submit" v-on:click="onClickLogIn">Log In!</button>
            </div>
                <div class="d-flex ms-auto p-2" v-if="this.$store.state.logged">
                    <button class="btn btn-outline-primary" type="submit">Logged!</button>
                </div>
            </div>
        </div>
    </nav>
</template> 

<script>
export default {
    created(){
        this.logged = this.$store.state.logged;
    },

    name: 'navbar', 
    
    data(){
        return {
            logged: false
        }
    },

    methods:{
        onClickLogIn(){
            this.$router.push('/');
        },
        onClickSignUp(){
            this.$router.push('/registration');
        },
        onClickHome(){
            this.$router.push('/home');
        }
    }
}
</script>

<style scoped>

.nav-height{
    max-width: 100%;
    text-align: center;
    
}

.padR{
    margin-right: 10px;
}

.navbar-brand-font{
    font-size: min(1.25rem, 4.5vw);
}

</style>