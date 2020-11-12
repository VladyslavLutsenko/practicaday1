<template>
    <div>
        <h3>{{student.name}}</h3>
        <p><img v-bind:src="student.photo" height="200" alt="student"></p>
        <p>Group: {{student.group}}</p>
        <p>
            Pract: 
            <input type="checkbox" v-bind:checked="student.isDonePr" onclick="return false;">
        </p>
        
        
        
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'StudentInfo',
    props: {
        id: ''
    },
    data(){
        return {
            url: 'http://46.101.212.195:3000/students/',
            student: {}
        }
    },
    mounted: function(){
        Vue.axios.get(this.url+this.id).then((response) =>{
            this.student=response.data;
        })
    },
}
</script>