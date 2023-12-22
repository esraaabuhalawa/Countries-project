<template>
  <section class="col-12 col-md-6 col-lg-3">
    <div class="card my-3 mx-2">
      <router-link :to="'/countrypage/' + country.name">
        <img :src="country.flags.png" :alt="country.name" class="card-img-top" />
      </router-link>
      <router-view></router-view>

      <div class="card-body">
        <h5 class="card-title">{{ country.name }}</h5>
        <ul class="">
          <li class="list-group-item">
            <span>Population : </span>
            <span>{{ country.population }}</span>
          </li>
          <li class="list-group-item">
            <span>Region : </span>
            <span>{{ country.region }}</span>
          </li>
          <li class="list-group-item">
            <span>Capital : </span>
            <span>{{ country.capital }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import { computed } from 'vue'

export default {
  props: ['country'],
  setup(props) {
    const countryData = computed(() => {
      return props.country
    })
    return { countryData }
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-top: 40px;
}
.card-img-top {
  width: 100%;
  height: 170px;
}
p {
  background: #000;
  color: #fff;
  font-size: 2rem;
}
.card-title {
  font-weight: 800;
  margin-top: 24px;
  margin-bottom: 20px;
}
.card-body {
  padding: 20px 25px;
}
ul {
  padding-left: 0;
}
.list-group-item {
  font-size: var(--hompags-fs);
  padding: 2px 0;
  span:first-of-type {
    font-weight: 600;
  }
  span:nth-of-type(2) {
    font-weight: 300;
  }
}
</style>
