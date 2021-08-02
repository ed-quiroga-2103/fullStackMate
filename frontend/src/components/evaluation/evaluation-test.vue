<template>

<div class="quiz-container center" id="quiz">
            <div class="quiz-header">
                <h2 id="question">Question text</h2>
                <ul>
                    <li>
                        <input
                            type="radio"
                            id="a"
                            name="answer"
                            class="answer"
                        />
                        <label id="a_text" for="a">Question</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            id="b"
                            name="answer"
                            class="answer"
                        />
                        <label id="b_text" for="b">Question</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            id="c"
                            name="answer"
                            class="answer"
                        />
                        <label id="c_text" for="c">Question</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            id="d"
                            name="answer"
                            class="answer"
                        />
                        <label id="d_text" for="d">Question</label>
                    </li>
                </ul>
            </div>
            <button id="submit">Submit</button>
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
* {
    box-sizing: border-box;
}

body {
    background-color: #b8c6db;
    background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    margin: 0;
    min-height: 100vh;
}

.quiz-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
    overflow: hidden;
    width: 600px;
    max-width: 100%;
}

.quiz-header {
    padding: 4rem;
}

h2 {
    padding: 1rem;
    text-align: center;
    margin: 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    font-size: 1.2rem;
    margin: 1rem 0;
}

ul li label {
    cursor: pointer;
}

button {
    background-color: #8e44ad;
    border: none;
    color: white;
    cursor: pointer;
    display: block;
    font-family: inherit;
    font-size: 1.1rem;
    width: 100%;
    padding: 1.3rem;
}

button:hover {
    background-color: #732d91;
}

button:focus {
    background-color: #5e3370;
    outline: none;
}
</style>