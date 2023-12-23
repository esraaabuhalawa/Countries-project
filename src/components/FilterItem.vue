<template>
  <div class="container">
    <header class="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between">
      <div class="input-group position-relative mb-3 mb-md-0" >

        <input
          type="text"
          id="target"
          class="form-control ps-4"

          v-model="searchCountry"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          @change="ChangeName($event)"
        />
        <label for="target" >
          <span id="addon-wrapping me-2">
            <i class="fa-solid fa-magnifying-glass pe-2"></i> 
          </span> Search for a country...</label>
      </div>


      <div class="custom-select" :class="{ open: isOpen }">
        <div class="select-box" @click="toggleDropdown">
          <span>{{ selectedOption }}</span>
          <span class="arrow">
            <i class="fa-solid fa-chevron-down"></i>
          </span>
        </div>
        <div class="options" @click="selectOption" v-show="isOpen">
          <div
            v-for="option in options"
            :key="option"
            :class=" option === selectedOption ? 'selected' : 'transparent' "
          >
            {{ option }}
          </div>
        </div>
        <select v-model="selectedOption" style="display: none">
          <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
      </div>
    </header>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    onValueChange: {
      type: Function,
      required: true,
    },
    onRegionChange:{
      type: Function,
      required: true,
    }
  },
  setup(props) {
    const searchCountry = ref('') 
    const selectedOption = ref('Filter by Region') 
    const isOpen = ref(false)
    const options = ['Filter by Region','Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

    //select input 
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const selectOption = (event) => {
      if (event.target.tagName === 'DIV') {
        selectedOption.value = event.target.innerText
        isOpen.value = false;
        props.onRegionChange(selectedOption.value);
      }
    }

    const ChangeName = (e) =>{
   
      props.onValueChange(e.target.value);
    
    }
    //Serach by name
    return {
      searchCountry,
      selectedOption,
      isOpen,
      options,
      toggleDropdown,
      selectOption,
      ChangeName
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  font-size: 14px !important;
}
.input-group {
  width: 100%;
  input {
    padding: 10px;
    border-radius: 5px !important;
  }
  .input-group-text {
    background: none;
    padding-left: 15px;
    border: 0;
  }
}
label{
  position: absolute;
    z-index: 10;
    top: 11px;
    font-size: 0px;
    left: 31px;
}
#target {
  border: 1px solid var(--light-elements);
}

.icon:hover{
  cursor: pointer;
  transform: scale(1.1);
  opacity: 0.8;
  transition: all 0.35s ease-out;
}
.form-control:focus {
  box-shadow: none;
}

/* Select Styling */
.custom-select {
  position: relative;
  display: inline-block;
  width: 60%;
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 9px 12px;
  border-radius: 5px;
}
.svg{
  font-size: 12px;
}
.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-top: none;
  display: none;
}

.options div {
  padding: 4px 7px;
  cursor: pointer;
}
.options div:first-of-type {
  padding-top: 10px;
}
.options div:last-of-type {
  padding-bottom: 10px;
}
.open .options {
  display: block;
  z-index: 100;
  margin-top: 7px;
  border-radius: 4px;
}
@media (min-width: 768px) {
  .input-group {
    width: 35%;
  }
  .custom-select {
    width: 25%;
  }
}
@media (min-width: 1024px) {
  .custom-select {
    width: 15%;
  }
}
</style>
