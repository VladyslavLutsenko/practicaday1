<template>
    
</template>

<script>
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
        this.axios.get(this.url+this.id).then((response) =>{
            this.student=response.data;
            console.log(response.data);
        })
    },
}
</script>