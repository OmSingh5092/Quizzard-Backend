const { response } = require('express');
const Result = require('../database/schema/result');
const Student = require('../database/schema/student');

module.exports.getAverageMarks = (results)=>{

    const students = results.length;
    var totalScore = 0;

    results.map((item,index)=>{
        totalScore+=item.score;
    })

    var average = totalScore/students;

    return average;
}

module.exports.getPercentageStudents = (results)=>{
    const subjectId = results[0].subject;
    Student.find({subjects:{$all:[subjectId]}})
    .then((docs)=>{
        const total = docs.length;

        return results.length/total;
    }).catch((err)=>{
        console.log("Error",err);
    })
}

module.exports.calculateScore = (responses,questions)=>{

    var score = 0;
    questions.map((item,index)=>{
        if(responses[index] == 0){
            
        }if(item.correct == responses[index]){
            score+=item.positive;
        }else{
            score-=item.negative;
        }
    })

    return score;
}

