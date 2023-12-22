<template>
  <div class="container">
    <header class="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between">
      <div class="input-group position-relative mb-3 mb-md-0" id="target">
        <div class="position-relative icon" @click="searchByName">
          <span id="addon-wrapping" class="position-absolute">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>

        <input
          type="text"
          class="form-control"
          placeholder="Search for a country..."
          v-model="searchCountry"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>

      <!----<div class="ms-auto select">
        <select class="form-select " aria-label="Default select example" v-model="region">

          <option value="" selected v-show="hide">Filter by Region</option>
          <option value="africa" class="mt-2">Africa</option>
          <option value="america" class="mt-2 pt-4">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>  
        </select>
      </div>-->
      <!------------Test-->

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
            :style="{ backgroundColor: option === selectedOption ? '#e0e0e0' : 'transparent' }"
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
//import { defineEmit } from 'vue'

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

    //Serach by name
    const searchByName = () => {
      props.onValueChange(searchCountry.value);
    }
    

    return {
      searchCountry,
      selectedOption,
      isOpen,
      options,
      toggleDropdown,
      selectOption,
      searchByName
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
  border-radius: 5px !important;
  input {
    padding: 10px;
    border: 0;
  }
  .input-group-text {
    background: none;
    padding-left: 15px;
    border: 0;
  }
}
#target {
  border: 1px solid var(--light-elements);
}
.icon {
  padding-right: 27px;
  padding-left: 18px;
  span {
    z-index: 100;
    top: 28%;
  }
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
