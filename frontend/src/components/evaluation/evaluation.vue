<template>
<div id= "evaluation" class="bg-contrast-custom center-screen mainbody">
    <div class="bg-secondary-custom question-window rcorners">
        <div id = "questions" class="center-screen ">
            <div>
                <h1>{{this.currentQuestion.question}}</h1>
                <div v-for="item in this.currentQuestion.equations" :key="item" v-katex:auto="{ colorIsTextColor: false}" class="katex">
                    {{item}}
                </div>
            </div>
        </div>

        <div id = 'options' class="list-group">
            <div class="form-check content-checkbox">
                <label v-for="(item, index) in this.currentQuestion.options" :key="index" :ref="'radio-'+index" class="content-checkbox"  @change="inputAnswer(index)">
                    <input name = "radiogroup" type="radio" v-model="selected[index]"/> {{item.text}} - {{item.equation}}
                </label>
            </div>
        </div>
        
    
    </div>
        <div class = "button-bar">
            <button type="button" class="btn btn-primary left" v-on:click="prevQuestion">Previous</button>
            <button type="button" class="btn btn-primary right" v-on:click="nextQuestion">Next</button>
        </div>
    
</div>


</template>

<script>
import Vue from 'vue';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

import {getWithExpiry} from "../../util/utilities.js"
var axios = require('axios');


Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
    throwOnError: false
  }
});


export default {
    created(){

        this.questions = this.getQuestions();
        this.fillAnswerList();

    },
    methods: {
        onClick(index){
            console.log(index);
        },
        parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
        async getQuestions(){
            var token = await getWithExpiry('token');
            if (token === null){
                this.$router.push('/');
            }
            var usrData = this.parseJwt(token);
    

            var config = {
                method: 'post',
                url: 'http://localhost:8000/all_questions',
                headers: { 
                    'x-access-token': token, 
                    'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                    'Content-Type': 'application/json'
                },
                    data: usrData
                };

            await axios(config).then(response=>{
                this.questions = response.data.data;
                this.questions = this.addDollarSigns(this.questions)
                this.currentQuestion = this.questions[0];

            });
        },
        getProgress(){

            var userStr = localStorage.getItem("user");
            var user = JSON.parse(userStr);
            var progress = user.progress;

            return progress;

        },
        async nextQuestion(){
            
            this.selected[this.answers[this.currentQuestionIndex]] = false;
           
            if(this.currentQuestionIndex < this.questions.length-1){

                this.currentQuestionIndex+=1;
                this.currentQuestion = this.questions[this.currentQuestionIndex];
            }
            else{
                console.log("Finished", this.answers);
                console.log('Answers', this.getCorrectAnswers());

                console.log('result', this.isEqualList(this.answers,this.getCorrectAnswers()));

                if(this.isEqualList(this.answers,this.getCorrectAnswers())){

                    if(this.level === 2){

                        console.log('done');
                        var token = await getWithExpiry('token');
                        if (token === null){
                            this.$router.push('/');
                        }

                        var progress = this.getProgress();

                        var currentLevel = localStorage.getItem('currentLevel');

                        progress[parseInt(currentLevel)-1]['completed'] = 1;


                        var config = {
                            method: 'post',
                            url: 'http://localhost:8000/update_progress',
                            headers: { 
                                'x-access-token': token, 
                                'Authorization': 'Basic QWRtaW46MTIzNDU=', 
                                'Content-Type': 'application/json'
                            },
                                data: progress
                            };

                        axios(config).then(response=>{
                            
                            console.log(response);

                            var userStr = localStorage.getItem("user");
                            var user = JSON.parse(userStr);
                            user.progress = progress;

                            userStr = JSON.stringify(user);
                            localStorage.setItem('user', userStr);

                        });


                    }
                    else this.level +=1;

                }

                else{

                    console.log('wrong answers');

                }

            }
        },
        prevQuestion(){
            if(this.currentQuestionIndex > 0){

                this.currentQuestionIndex-=1;
                this.currentQuestion = this.questions[this.currentQuestionIndex];
            }
            else{
                console.log("Finished")
            }
        },

        isEqualList(list1, list2){
            
            if(list1.length === list2.length){

                for (let index = 0; index < list1.length; index++) {
                    if(list1[index] !== list2[index]){
                        return false;
                    }
                }

                return true;

            }
            else{
                return false;
            }

        },

        addDollarSigns(questions){
            
            for (let index = 0; index < questions.length; index++) {
                const question = questions[index];
                
                for (let index = 0; index < question.equations.length; index++) {
                    const equation = question.equations[index];
                    question.equations[index] = "$$ \\color{black} " + equation + "$$";
                }

            }

            return questions
        },
        fillAnswerList(){
            for (let index = 0; index < this.questions.length; index++) {
                this.answers.push(0);
            }
        },
        inputAnswer(index){
            this.answers[this.currentQuestionIndex] = index;
        },
        getCorrectAnswers(){

            var correct = [];

            for (let index = 0; index < this.questions.length; index++) {
                const question = this.questions[index];

                correct.push(question.answer-1);
                
            }

            return correct;
        }


    },
    name: 'evaluation',
    components: {

    },
    data () {
        return {
        options : [{text:'option A'},{text:'option B'},{text:'option C'},{text:'option D'},{text:'option E'}],
        questions : [],
        currentQuestionIndex : 0,
        currentQuestion : {},
        answers : [],
        level : 0,
        selected: [0,0,0,0]
        }
    },

}
</script>

<style scoped>
.center-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
}
.content-checkbox {
    text-align: left;
    display: block;
    padding: 5px;
}

.mainbody{
    position: absolute;
    min-height: 100%;
    height: 100%;
    width: 100%;
    padding-top: 10%;
    padding-bottom: 10%;
}

h1 {
    font-size: min(1.5rem,4.5vw);
}

.mainbody h1, .mainbody p, .mainbody label{
    color: #000
}
.katex { 
    font-size: min(1.2rem, 3.5vw) !important; 
} 

.button-bar{
    display: block;
    width: 50%;
    margin-top: 1rem;

}
.right{
    position: static;
    float: right;
}
.left{
    position: static;
    float: left;
}
.question-window{
    width: 50%;
    display: flex;  
    flex-wrap: wrap;
    padding: 1%;
}


</style>