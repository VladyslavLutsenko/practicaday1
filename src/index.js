import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var app = new Vue({
    el: '#app',
    data:{
        url: 'http://46.101.212.195:3000/students',
        students_parsed: [],
        students: [
            {index: 0, name: 'Name1 Surname1', group: 'Rpz 17 1/9', year: 2001, pract: false},
            {index: 1, name: 'Name2 Surname2', group: 'Rpz 17 1/9', year: 2001, pract: false},
            {index: 2, name: 'Name3 Surname3', group: 'Rpz 17 1/9', year: 2001, pract: true}   
        ],
        selectedName: undefined,
        selectedGroup: undefined,
        selectedYear: undefined,
        selectedPract: undefined,
        findName: undefined,
        isSelected: []
    },
    watch: {
        findName: function(val){
            this.findStudent(val);
        }
    },
    mounted: function(){
        axios.get(this.url).then((response) =>{
            console.log(response.data);
            this.students_parsed=response.data;
        })
    },
    methods: {
        addStudent() {
            if (!this.selectedName || !this.selectedGroup || !this.selectedYear) {
                return;
            }
            var newStudent={};
            newStudent.index=this.students.length;
            newStudent.name=this.selectedName;
            newStudent.group=this.selectedGroup;
            newStudent.year=this.selectedYear;
            newStudent.pract=this.selectedPract;
            this.students.push(newStudent);
            this.selectedName=undefined;
            this.selectedGroup=undefined;
            this.selectedYear=undefined;
            this.selectedPract=undefined;
        },
        removeStudent(n) {
            this.students.splice(n, 1);
        },
        findStudent(x){
            this.students.forEach(student => {
                if (student.name.includes(x) && x!="") {
                    this.isSelected[student.index]=true;
                }
                else{
                    this.isSelected[student.index]=false;
                }
            });
        }
    }  
});

var app = new Vue({
    el: '#converter',
    data:{
        url: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
        enterAmount: undefined,
        selectedFrom: undefined,
        selectedTo: undefined,
        info: [
            {currency: "UAH", price: 1},
            {currency: "USD", price: undefined},
            {currency: "EUR", price: undefined},
            {currency: "RUR", price: undefined},
            {currency: "BTC", price: undefined},
        ]
    },
    mounted: function () {
        axios.get(this.url).then((response) =>{
            this.info[1].price=response.data[0].buy;
            this.info[2].price=response.data[1].buy;
            this.info[3].price=response.data[2].buy;
            this.info[4].price=response.data[3].buy;
            console.log(this.info);
        })
    },
    computed: {
        resultAmount: function () {
            var tempFrom;
            var tempTo;
            var ratio;
            this.info.forEach(element => {
                if (element.currency==this.selectedFrom) {
                    tempFrom=element.price;
                }
            });
            this.info.forEach(element => {
                if (element.currency==this.selectedTo) {
                    tempTo=element.price;
                }
            });
            ratio=tempFrom/tempTo;
            return this.enterAmount*ratio;
        }
    },
    methods:{

    }
});