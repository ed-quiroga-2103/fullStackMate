<template>
    <div class="center-screen bg-dark-custom">
        <body>
            <Loading :isLoading = "isLoading"/>
            <d3-network :net-nodes="getNodes()" :net-links="getLinks()" :options="getOptions()" ref="graph" v-on:node-click="nodeClick"/>
        </body>
    </div>
</template>

<script>




import D3Network from 'vue-d3-network'
import graphData from '../../assets/graphs/graphData.json'
import Loading from './LoadingScreen'
var axios = require('axios');
import {getWithExpiry} from "../../util/utilities.js"


export default {

    async created(){
        this.isLoading = true;
        
        var token = await getWithExpiry('token');
        console.log("Token: ", token);
        if (token === null){
            //Sesion expirada, debe ingresar de nuevo
            this.$router.push('/');

        }
        else{
            this.$store.commit("changeLogState", "1");
        }

    },
    mounted(){
        
        console.log(screen.width, screen.height);
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
            options['size']['w'] = screen.width;
            options['size']['h'] = screen.height;

            var optionsStr = JSON.stringify(options);

            localStorage.setItem('options', optionsStr);

            return options;
        },
        getNodes(){
            var graphStr = localStorage.getItem("mainGraph");
            var graph = JSON.parse(graphStr);
            var nodes = graph.nodes;
            var progress = this.getProgress();

            for (let index = 0; index < nodes.length; index++) {

                    //Verifica si cumple con los requisitos
                    var needs = nodes[index]['needs'];

                    var verified = true;
                    
                    if(typeof needs !== 'undefined'){
                        console.log(needs)
                        //Itera por la lista de dependencias
                        for (let cont = 0; cont < needs.length; cont++) {
                            //Selecciona el indice de la dependencia
                            const need = needs[cont];
                            //Verifica que el indice exista
                            if (typeof progress[need] !== 'undefined'){
                                //Si existe, y no esta terminado, se coloca como falso
                                if (!progress[need]['completed']){
                                    verified = false;
                                    break;
                                }
                            }
                            //Si no existe, se coloca como amarillo
                            
                        }

                    }
                    else{
                        verified = false;
                    }


                if (verified){
                    nodes[index]['_color'] = 'yellow';
                    continue;
                }

                //Si existe el registro de ese nodo en los datos del usuario
                if (typeof progress[index] !== 'undefined'){

                    //Verifica si está completado
                    if (progress[index]['completed']){

                        nodes[index]['_color'] = 'green';

                    }
                    
                    else if (progress[index]['inProgress']){

                        nodes[index]['_color'] = 'blue';

                    }
                    else{
                        nodes[index]['_color'] = 'red';

                    }
                }
                else{
                    nodes[index]['_color'] = 'red';
                }

            }
            return nodes;
        },

        getLinks(){
            var graphStr = localStorage.getItem("mainGraph");
            var graph = JSON.parse(graphStr);
            return graph.links
        },

        isAvailable(nodeId){

            var progress = this.getProgress();

            nodeId = eval(nodeId-1);

            console.log('eval',progress[nodeId]);

            if(progress[nodeId]['completed'] || progress[nodeId]['inProgress']) return true;
            else return false;

        },

        getProgress(){

            var userStr = localStorage.getItem("user");
            var user = JSON.parse(userStr);
            var progress = user.progress;

            return progress;

        }

    }

}

//STYLE CAN NOT BE SCOPED

</script>


<style>
canvas{
    position:absolute;top:0;left:0}
    .net{height:100%;margin:0}
    .node{stroke:rgba(18,120,98,.7);

    stroke-width:3px;

    -webkit-transition:fill .5s ease;
    transition:fill .5s ease;
    fill:red
    }
    
    .node.selected{stroke:#caa455}
    .node.pinned{stroke:rgba(190,56,93,.6)}
    .link{stroke:rgba(18,120,98,.3)}
    .link,
    .node{stroke-linecap:round}
    .link:hover,
    .node:hover{stroke:#be385d;stroke-width:5px}
    .link.selected{stroke:rgba(202,164,85,.6)}
    .curve{fill:none}
    .node-label{
        font-size: 15px;
        stroke: black;
        stroke-width: 0.5px;
        fill: black !important;
    }
    .link-label{
        -webkit-transform:translateY(-.5em);
    transform:translateY(-.5em);
    text-anchor:middle
}

.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

</style>
