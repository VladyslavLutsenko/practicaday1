<template>
    <div>
        <label class="switch">
            <input type="checkbox" id="one" @change="sliderchange()">
            <span class="slider round"></span>
        </label>
        <!-- <table>
            <tr>
                <th>Name</th>
                <th>Group</th>
                <th>Year</th>
                <th>Pract</th>
                <th>Remove</th>
            </tr>
            <tr v-for="student in students" v-bind:key="student._id" v-bind:class="[isSelected[student._id] ? 'selected' : '' ]">
                <td>{{ student.name }}</td>
                <td>{{ student.group }}</td>
                <td>{{ student.year }}</td>
                <td>
                    <input type="checkbox" v-bind:checked="student.pract" onclick="return false;">
                </td>
                <td><button @click="removeStudent(student._id)">Remove</button></td>
            </tr>
        </table>
        <br>
        <p>
            Name:
            <input type="text" v-model.trim="selectedName">
        </p>
        <p>
            Group:
            <select v-model="selectedGroup">
                <option value="Rpz 17 1/9">Rpz 17 1/9</option>
                <option value="Rpz 17 2/9">Rpz 17 2/9</option>
            </select>
        </p>
       <p>
           Year:
           <input type="number" v-model.number="selectedYear">
       </p>
        <p>
            Pract:
            <input type="checkbox" value=true v-model="selectedPract">
        </p>
        <p>
            <button @click="addStudent">Add</button>
        </p>
        <br>
        <p>
            Find:
            <input type="text" v-model="findName">
        </p>
        <br> -->
        <table>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Group</th>
                <th>Pract</th>
                <th v-if="!isUpdating.status">Remove</th>
                <th>Update</th>
            </tr>
            <tr v-for="student in students_parsed" v-bind:key="student._id" v-bind:class="[isSelected[student._id] ? 'selected' : '' ]">
                <td><img v-bind:src="student.photo" height="50" alt="student" ></td>
                <td>
                    <p v-if="isUpdating.id!=student._id">
                        <router-link v-bind:to="'/student-info/'+student._id">
                            {{student.name}}
                        </router-link>
                    </p>
                    <input v-if="isUpdating.status && (isUpdating.id==student._id)" type="text" v-model.trim="updateName_p">
                </td>
                <td>
                    <span v-if="isUpdating.id!=student._id">
                        {{ student.group }}
                    </span>
                    <select v-if="isUpdating.status && (isUpdating.id==student._id)" v-model="updateGroup_p" >
                        <option value="Rpz 17 1/9">Rpz 17 1/9</option>
                        <option value="Rpz 17 2/9">Rpz 17 2/9</option>
                    </select>
                </td>
                <td>
                    <input v-if="isUpdating.id!=student._id" type="checkbox" v-bind:checked="student.isDonePr" onclick="return false;">
                    <input v-if="isUpdating.status && (isUpdating.id==student._id)" type="checkbox" value=true v-model="updatePract_p">
                </td>
                <td v-if="!isUpdating.status"><button v-if="student.group === currentUser.group" @click="removeStudent_p(student._id)">Remove</button></td>
                <td >
                    
                    <button v-if="!isUpdating.status" @click="updateInit(student._id)">Change</button>
                    <button v-if="(isUpdating.status && (isUpdating.id==student._id))" @click="updateStudent_p(student._id)">Update</button>
                </td>
            </tr>
        </table>
        <h4>Total: {{studentsCount}}</h4>
        <div>
            <p>
                Find:
                <input type="text" v-model="findName_2">
            </p>
            <br>
            <p>
                Name:
                <input type="text" v-model.trim="selectedName_p">
            </p>
            <p>
                Group:
                <select v-model="selectedGroup_p">
                    <option value="Rpz 17 1/9">Rpz 17 1/9</option>
                    <option value="Rpz 17 2/9">Rpz 17 2/9</option>
                </select>
            </p>
            <p>
                Pract:
                <input type="checkbox" value=true v-model="selectedPract_p">
            </p>
            <p>
                <button @click="addStudent_p">Add</button>
            </p>
        </div>
        <div>
            <p>
                Enter Amount: 
                <input type="number" v-model.number="enterAmount">
            </p>
            <p>
                Convert From: 
                <select v-model="selectedFrom">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUR">RUR</option>
                    <option value="BTC">BTC</option>
                </select>
                Convert To: 
                <select v-model="selectedTo">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUR">RUR</option>
                    <option value="BTC">BTC</option>
                </select>
            </p>
            <p v-if="resultAmount">
                {{enterAmount}} {{ selectedFrom }} equals {{resultAmount | round}} {{ selectedTo }}
            </p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'Students',
    data(){
        return {
            url: 'http://46.101.212.195:3000/students',
            students_parsed: [],
            students: [
                {_id: 0, name: 'Name1 Surname1', group: 'Rpz 17 1/9', year: 2001, pract: false},
                {_id: 1, name: 'Name2 Surname2', group: 'Rpz 17 1/9', year: 2001, pract: false},
                {_id: 2, name: 'Name3 Surname3', group: 'Rpz 17 1/9', year: 2001, pract: true}   
            ],
            selectedName: undefined,
            selectedGroup: undefined,
            selectedYear: undefined,
            selectedPract: undefined,
            selectedName_p: undefined,
            selectedGroup_p: undefined,
            selectedPract_p: undefined,
            updateName_p: undefined,
            updateGroup_p: undefined,
            updatePract_p: undefined,
            findName: undefined,
            findName_2: undefined,
            isSelected: {},
            isUpdating: {status: false, id: undefined},
            url_p: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
            enterAmount: undefined,
            selectedFrom: undefined,
            selectedTo: undefined,
            info: [
                {currency: "UAH", price: 1},
                {currency: "USD", price: undefined},
                {currency: "EUR", price: undefined},
                {currency: "RUR", price: undefined},
                {currency: "BTC", price: undefined},
            ],
        }
    },
    watch: {
        findName: function(val){
            this.findStudent(this.students,val);
        },
        findName_2: function(val){
            this.findStudent(this.students_parsed,val);
        }
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
        },
        studentsCount () {
            return this.$store.getters.getCount
        },
        currentUser () {
            return this.$store.getters.getUser
        }
    },
    mounted: function(){
        let chbox;
        chbox=document.getElementById('one');
        if (localStorage.getItem('theme')) {
            try {
                this.$store.commit('setTheme', localStorage.getItem('theme'));
            } catch(e) {
                localStorage.removeItem('theme');
            }
        }
        if (this.$store.getters.getTheme=='1') {
            this.includeCSS('../style/1.css');
            chbox.checked = true;
        } else if (this.$store.getters.getTheme=='2') {
            this.includeCSS('../style/2.css');
            chbox.checked = false;
        }
        Vue.axios.get(this.url).then((response) =>{
            this.students_parsed=response.data;
            this.$store.commit('setCount', this.students_parsed.length);
        })
        Vue.axios.get(this.url_p).then((response) =>{
            this.info[1].price=response.data[0].buy;
            this.info[2].price=response.data[1].buy;
            this.info[3].price=response.data[2].buy;
            this.info[4].price=response.data[3].buy;
        })
    },
    filters : {
        round : function(value) {
            return value.toFixed(2);
        }
    },
    methods: {
        addStudent() {
            if (!this.selectedName || !this.selectedGroup || !this.selectedYear) {
                return;
            }
            var newStudent={};
            newStudent._id=this.students.length;
            newStudent.name=this.selectedName;
            newStudent.group=this.selectedGroup;
            newStudent.year=this.selectedYear;
            newStudent.pract=this.selectedPract;
            this.students.push(newStudent);
            this.selectedName=undefined;
            this.selectedGroup=undefined;

            this.selectedPract=undefined;
        },
        addStudent_p() {
            if (!this.selectedName_p || !this.selectedGroup_p) {
                return;
            }
            var postBody= {
                name: this.selectedName_p,
                group: this.selectedGroup_p,
                isDonePr: this.selectedPract_p
            };
            this.axios.post(this.url, postBody).then((response) =>{
                console.log(response.data);
                
            }).then(()=>{
                this.axios.get(this.url).then((response) =>{
                    var newStudent={};
                    var index=response.data.length;
                    index--;
                    newStudent=response.data[index];
                    this.students_parsed.push(newStudent);
                    this.$store.commit('setCount', this.students_parsed.length);
                    console.log(response.data);
                })
            })
            this.selectedName_p=undefined;
            this.selectedGroup_p=undefined;
            this.selectedPract_p=undefined;
        },
        removeStudent(n) {
            this.students.splice(n, 1);
        },
        removeStudent_p(n) {
            var url_mod=this.url+`/${n}`;
            this.axios.delete(url_mod).then((response) =>{
                console.log(response.data);
            })
            var i=0;
            this.students_parsed.forEach(element => {
                if (element._id==n) {
                    this.students_parsed.splice(i, 1);
                }
                i++;
            });
            this.$store.commit('setCount', this.students_parsed.length);

        },
        updateInit(id){
            this.isUpdating.status= true;
            this.isUpdating.id= id;
            this.students_parsed.forEach(element => {
                if (element._id==id) {
                    this.updateName_p=element.name;
                    this.updateGroup_p=element.group;
                    this.updatePract_p=element.isDonePr;
                }
            });
            
        },
        updateStudent_p(n) {
            var url_mod=this.url+`/${n}`;
            var postBody= {
                name: this.updateName_p,
                group: this.updateGroup_p,
                isDonePr: this.updatePract_p
            };
            this.axios.put(url_mod, postBody).then((response) =>{
                console.log(response.data);
            })
            this.students_parsed.forEach(element => {
                if (element._id==n) {
                    element.name=this.updateName_p;
                    element.group= this.updateGroup_p;
                    element.isDonePr= this.updatePract_p;
                }
            });
            this.updateName_p=undefined;
            this.updateGroup_p=undefined;
            this.updatePract_p=undefined;
            this.isUpdating.status=false;
            this.isUpdating.id=undefined;
        },
        findStudent(arr,x){
            arr.forEach(student => {
                if (student.name.includes(x) && x!="") {
                    this.isSelected[student._id]=true;
                }
                else{
                    this.isSelected[student._id]=false;
                }
            });
        },
        sliderchange(){
            let chbox;
            chbox=document.getElementById('one');
            if (chbox.checked) {
                console.log('Выбран');
                this.includeCSS('../style/1.css');
                localStorage.setItem ('theme', '1');
            }
            else {
                console.log('Не выбран');
                this.includeCSS('../style/2.css');
                localStorage.setItem ('theme', '2');
            }
        },
        includeCSS(aFile, aRel){
            let head = window.document.getElementsByTagName('head')[0]
            let style = window.document.createElement('link')
            style.href = aFile
            style.rel = aRel || 'stylesheet'
            head.appendChild(style)
        }
    }
}
</script>

<style scoped>
    table, th, tr, td{
        border: 1px  solid black;
        border-collapse: collapse;
        padding: 10px;
        }
    .selected{
        background-color: limegreen;
    }
    .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    }
    
    .switch input {display:none;}
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + .slider {
        background-color: #2196F3;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
</style>