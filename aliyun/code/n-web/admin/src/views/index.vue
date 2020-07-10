<template>
  <div>
    <h1 style="text-align: center;margin-top: 100px">{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        msg: '命格无双 ， 一统江山 !'
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
