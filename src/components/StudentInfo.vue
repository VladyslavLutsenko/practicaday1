<template>
    <div>
        <h3>{{student.name}}</h3>
        <p><img @click="show" v-bind:src="student.photo" class="pointer" height="200" alt="student"></p>
        <modal name="my-first-modal" :width="600" :height="600">
            <div>
                <img v-bind:src="student.photo" height="550" alt="student">
                <br>
                <button @click="hide">Close</button>
            </div>
        </modal>
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
    methods: {
        show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        }
    }
}
</script>

<style  scoped>
    .pointer{
        cursor: pointer;
    }
</style>