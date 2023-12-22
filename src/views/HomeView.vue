<template>
  <div class="container">
    <country-list></country-list>
  </div>
</template>

<script>

import CountryList from '@/components/CountryList.vue'

export default {
  components: {
    'country-list': CountryList
  }
}
</script>
