<template>
  <div>
    <section class="row">
      <filter-item :onValueChange="NameChange" :onRegionChange="SearchByRegion"></filter-item>
    </section>

    <section class="row">
      <section class="my-3" v-show="notFound">
        <div class="alert alert-danger mt-5 py-3" role="alert">
          Sorry, There is no Result for your search.
        </div>
      </section>
      <country-card v-for="(country, i) in countries" :key="i" :country="country"></country-card>
    </section>

  </div>
</template>
<script>
import FilterItem from './FilterItem.vue'
import CountryCard from './CountryCard.vue'
import data from '../data/data.json'
import { computed, onMounted, ref , watch } from 'vue'

export default {
  components: {
    'country-card': CountryCard,
    'filter-item': FilterItem
  },

  setup() {
    const getCountryName = ref('')
    const regionFilter = ref('')
    const filteredResults = ref([])
    const notFound = ref(false)


    const countries = computed(() => {

      if (getCountryName.value === '') {
        if (!regionFilter.value || regionFilter.value == 'Filter by Region') {
          filteredResults.value = data
          notFound.value = false
        } else {
          filteredResults.value = data.filter((country) => country.region === regionFilter.value)
          notFound.value = false
        }
      } else if (getCountryName.value !== '') {
        if (!regionFilter.value || regionFilter.value == 'Filter by Region') {
            filteredResults.value = data.filter((item) => {
              return item.name.toLowerCase().includes(getCountryName.value.toLowerCase())
            })
          if (filteredResults.value.length == 0) {
            notFound.value = true

          } else {
            notFound.value = false
          }
        } else {
          filteredResults.value = filteredResults.value.filter((country) => country.region === regionFilter.value)

          if (filteredResults.value.length == 0) {
            notFound.value = true

          } else {
            notFound.value = false
          }
        }
        
      }else{
        filteredResults.value = data
      }
      return filteredResults.value
    })

    //filter by country Name
    const NameChange = (country) => {
      getCountryName.value = country;
      console.log(getCountryName.value)
    }

    //filter by Region
    const SearchByRegion = (region) => {
      regionFilter.value = region
      console.log(regionFilter.value)
    }

    //setting in local storage  array
    watch(getCountryName, (newVal) => {
      localStorage.setItem('countryName', newVal)
    })

    watch(regionFilter, (newVal) => {
      localStorage.setItem('regionName', newVal)
    })

    watch(filteredResults, (newVal) => {
      localStorage.setItem('filteredResults', JSON.stringify(newVal));
    },{deep:true})

    
    onMounted(()=> {
      getCountryName.value= localStorage.getItem('countryName') || ''
      regionFilter.value = localStorage.getItem('regionName') || ''
      filteredResults.value= JSON.parse(localStorage.getItem('filteredResults')) || []
    })
    
    return { countries, getCountryName, NameChange, SearchByRegion, regionFilter, notFound  }
  }
  
}
</script>

<style scoped></style>
