<template>
    <div class="center-screen bg-dark-custom" style="margin: 0; height: 100%; overflow: hidden;">
        <body>
            <Loading :isLoading = "isLoading"/>
            <d3-network :net-nodes="this.nodes" :net-links="this.links" :options="getOptions()" ref="graph" v-on:node-click="nodeClick"/>
        </body>
    </div>
</template>

<script>

import D3Network from 'vue-d3-network'
import graphData from '../../assets/graphs/graphData.json'
import Loading from './LoadingScreen'
var axios = require('axios');
import {colorNodes} from "../../util/colorNodes.js"
import VueCookies from 'vue-cookies';

export default {

    //Should this be async?
    //Remove token from here, we should be using cookies
    async created(){
        //For loading screen;
        this.isLoading = true;

        //API call for graph
        const graphResponse = await axios.get('http://localhost:8000/graph/mainGraph');

        //API call for User (me)
        const token = VueCookies.get('session_token');
        var config = {
            method: 'post',
            url: 'http://localhost:8000/me',
            headers: { 
                'x-access-token': token, 
                'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                'Content-Type': 'application/json'
            }
        };

        const me = await axios(config);

        console.log("Progress Response: ", me.data);

        this.user = me.data.user;

        //Getting data   
        const uncoloredNodes = graphResponse.data.nodes;
        const coloredNodes = colorNodes(uncoloredNodes, this.user.progress);     
        this.nodes = coloredNodes;
        this.links = graphResponse.data.links;
        console.log("Main Graph: ", graphResponse);


        
        if (token === null){
            //Sesion expirada, debe ingresar de nuevo
            this.$router.push('/');
        }
        else{
            this.$store.commit("changeLogState", "1");
        }
    },
    mounted(){
        setTimeout(()=>{
                this.isLoading = false;
        }, 2000);
    },

    name: 'mainGraph',
    components: {
        D3Network,
        Loading
    },
    data () {
        return {
            nodes: null,
            links: null,
            options: null,
            user: null,
            fullPage: false,
            nodeLevel: 0,
            nodeData: [],
            delay: 200,
            clicks: 0,
            isLoading: true,
            useSlot: false,
            inTopicNode: false
            }
    },
    methods: {
        //Redireccionamiento a el nodo seleccionado
        nodeClick (event, node) {
            //Verificar si es click o doble click
            if(this.oneClick()){
                
                //Verificar si el nodo es permitido y no se encuentra en un nodo interno
                if(this.isAvailable(node.id)){

                    //Asi se almaceno el token
                    //localStorage.setItem('token', response.data.token);
                    var data = {
                        level : node.id
                    }
                    var config = {
                    method: 'post',
                    url: 'http://localhost:8000/topicGraph',
                    headers: { 
                        'x-access-token': '', 
                        'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                        'Content-Type': 'application/json'
                    },
                        data: data
                    };

                    axios(config).then(response=>{
                            //Ejemplo
                            var data = response.data.msg;
                            var dataStr = JSON.stringify(data);
                            
                            localStorage.setItem('topicGraph', dataStr);

                            //Aca hay que poner el grafo siguiente dentro de localStorage
                            localStorage.setItem('currentLevel',node.id);
                            this.$router.push('/topicGraph');
                            
                    });


                    
                }
                
            }
            else{
                console.log(node.id);
            }
        },
        onCancel(){
            console.log('canceled');
        },
        //Funcion para verificar doble click
        //True: Doble click, else False
        oneClick: function(){
            this.clicks++ 
            if(this.clicks === 1) {
                var self = this
                this.timer = setTimeout(function() {
                self.clicks = 0
                }, this.delay);
                return false;
            } else{
                clearTimeout(this.timer);  
                this.clicks = 0;
                return true;
            }         
            },
        parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
        getOptions(){
            var options= graphData['options'];
            const navHeight = document.getElementById("navbar").clientHeight;
            options['size']['w'] = window.innerWidth;
            options['size']['h'] = window.innerHeight - navHeight;

            return options;
        },

        isAvailable(nodeId){

            var progress = this.getProgress();

            nodeId = eval(nodeId-1);

            console.log('eval',progress[nodeId]);

            if(progress[nodeId]['completed'] || progress[nodeId]['inProgress']) return true;
            else return false;

        },

        getProgress(){

            var user = this.user;
            var progress = user.progress;

            return progress;

        }

    }

}

</script>