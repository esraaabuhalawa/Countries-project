<template>
  <div>
    <nav-item></nav-item>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
import NavItem from '@/components/NavItem.vue'
import { onMounted } from 'vue'
export default {
  components: { 'nav-item': NavItem },
  data() {
    return {
      appliedColor: 'light'
    }
  },
  methods: {
   /* darkTheme(applied) {
      this.appliedColor = applied;
      localStorage.setItem('AppliedTheme',this.appliedColor)
    },
    lightTheme(applied) {
      this.appliedColor = applied
      localStorage.setItem('AppliedTheme',this.appliedColor)
    }*/
  },
  /*watch:{
    appliedColor(newVal,old){
      console.log(newVal)
      localStorage.setItem('AppliedTheme', newVal)
    }
    
  },*/

  onMounted(){
   // this.appliedColor = localStorage.getItem('AppliedTheme') || ''
   //localStorage.getItem('appliedTheme')
  }
}
</script>
<style scoped>
@media (min-width: 1024px) {
}
</style>
