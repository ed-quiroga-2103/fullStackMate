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
import Loading from './LoadingScreen'
import {getWithExpiry} from "../../util/utilities.js"

var axios = require('axios');

export default {
    created(){
        

        this.isLoading = true;
        var token = getWithExpiry('token');
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
        }, 1000);
        },

    name: 'topicGraph',
    components: {
        D3Network,
        Loading
    },
    data () {
        return {
        isLoading : false,
        name: 'topicGraph',
        delay: 200,
        clicks: 0,
        evalNum: 0
        
        }
    },
    methods: {
        nodeClick (event, node) {
            if(this.oneClick()){
                if(node.id === this.evalNum){
                    this.$router.push('/evaluation');
                }
                else{
                    //Consulta los datos relacionados al nodo, ya sean una practica, o un recurso
                    var data = this.getNodeData();
                    //Selecciona la direccion correspondiente al nodo
                    var redir = data[node.id-1]
                    window.open(redir, "_blank");
                }
            }
            else{
                console.log(node.id);
            }
        },
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
        getOptions(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);

            return options;
        },
        getNodes(){
            var graphStr = localStorage.getItem("topicGraph");
            var graph = JSON.parse(graphStr);
            var nodes = graph.nodes;
            //evalNum funciona para verificar cual es el ultimo nodo y validar si se accesa a una evaluacion
            //ESTO SE DEBE CAMBIAR, EN graph.data.data SE DEBE INGRESAR CUALES NODOS SON DE PRACTICA
            this.evalNum = nodes.length;

            var progress = this.getProgress();

            var currentLevel = localStorage.getItem('currentLevel');

            var levelProgress = progress[parseInt(currentLevel)-1];

            for (let index = 0; index < nodes.length; index++) {
                
                if (typeof levelProgress[index] !== 'undefined'){
                    if (levelProgress[index]){

                        nodes[index]['_color'] = 'green';
                        
                    }
                    
                    else{

                        nodes[index]['_color'] = 'red';

                    }
                }
                else{
                    nodes[index]['_color'] = 'red';
                }
            }
                            
            nodes[this.evalNum-1]['_color'] = 'blue';

            return nodes;
        },

        getLinks(){
            var graphStr = localStorage.getItem("topicGraph");
            var graph = JSON.parse(graphStr);
            return graph.links
        },
        getNodeData(){
            var graphStr = localStorage.getItem("info");
            var graph = JSON.parse(graphStr);
    
            var currentLevel = localStorage.getItem("currentLevel");
            currentLevel = parseInt(currentLevel) ;
            return graph.infoLinks[currentLevel];
        },

        async getNodeLevel(){
            var token = await getWithExpiry('token');
            if (token === null){
                this.$router.push('/');
            }
            var usrData = this.parseJwt(token);


            var config = {
                method: 'post',
                url: 'http://localhost:8000/userLevel',
                headers: { 
                    'x-access-token': token, 
                    'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                    'Content-Type': 'application/json'
                },
                    data: usrData
                };

            await axios(config).then(response=>{
                
                this.nodeLevel = response.data.msg.length;
                this.nodeData = response.data.msg;

            });
        },
        
        getProgress(){

            var userStr = localStorage.getItem("user");
            var user = JSON.parse(userStr);
            var progress = user.progress;

            return progress;

        }
    }

}
</script>

<style>
canvas{
    position:absolute;top:0;left:0}
    .net{height:100%;margin:0}
    .node{stroke:rgba(145, 173, 252, 0.7);

    stroke-width:3px;

    -webkit-transition:fill .5s ease;transition:fill .5s ease;fill:#dcfaf3}
    .node.selected{stroke:#caa455}
    .node.pinned{stroke:rgba(190,56,93,.6)}
    .link{stroke:rgba(18,120,98,.3)}
    .link,
    .node{stroke-linecap:round}
    .link:hover,
    .node:hover{stroke:#be385d;stroke-width:5px}
    .link.selected{stroke:rgba(202,164,85,.6)}
    .curve{fill:none}.link-label,
    .node-label{fill:#127862}
    .link-label{-webkit-transform:translateY(-.5em);
    transform:translateY(-.5em);
    text-anchor:middle
    }


</style>
