<template>
  <div class="container">
    <router-link to="/">
      <button class="back"><i class="fa-solid fa-arrow-left-long"></i> Back</button>
    </router-link>

    <div class="row">
      <section class="col-12 col-md-6 col-lg-6 pe-md-4 pe-lg-5">
        <img :src="singleCountry.flags.png" class="img-fluid w-100" />
      </section>
      <section class="col-12 col-md-6 col-lg-6 ps-lg-5 ps-3 details">
        <h2 class="fs-3 mt-4 mt-md-0">{{ singleCountry.name }}</h2>
        <div class="row">
          <div class="col-12 col-md-6">
            <ul class="m-0 p-0">
              <li class="list-group-item">
                <span>Native Name : </span>
                <span>{{ singleCountry.nativeName }}</span>
              </li>
              <li class="list-group-item">
                <span>Population : </span>
                <span>{{ singleCountry.population }}</span>
              </li>
              <li class="list-group-item">
                <span>Region : </span>
                <span>{{ singleCountry.region }}</span>
              </li>
              <li class="list-group-item">
                <span>Sub Region : </span>
                <span>{{ singleCountry.subregion }}</span>
              </li>
              <li class="list-group-item">
                <span>Capital : </span>
                <span>{{ singleCountry.capital }}</span>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-6 mt-4 mb-2 mt-md-4 mb-md-2">
            <ul class="m-0 p-0">
              <li class="list-group-item">
                <span>Top Level Domain : </span>
                <span>{{ singleCountry.topLevelDomain[0] }}</span>
              </li>
              <li class="list-group-item">
                <span>Currencies : </span>
                <span v-for="(currancy, x) in singleCountry.currencies" :key="x"
                  >{{ currancy.code }}
                </span>
              </li>
              <li class="list-group-item">
                <span>languages: </span>
                <span v-for="(language, y) in singleCountry.languages" :key="y"
                  >{{ language.name }} ,
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="row mt-4" v-if="singleCountry.borders">
          <div class="py-md-4 d-block d-md-flex justify-content-md-between py-2">
            <div class="fw-bold mb-3 mb-md-0 me-2 me-md-0 border-title">Border Countries :</div>
            <div class="d-block w-md-75 mb-4 mb-md-0 border-count">
              <span>
                <button
                  v-for="(border, z) in singleCountry.borders"
                  :key="z"
                  class="border me-1 mb-2"
                  @click="FindCountry(border)"
                >
                  {{ border }}
                </button>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ref } from 'vue'
import data from '../data/data.json'

export default {
  //props: ['country'],

  setup() {
    const route = useRoute()
    const router = useRouter()
    let countryId = route.params.id
    const currentRoute = ref(route.path)
    const countryName = ref(null)
    const currentPath = ref('')

    const FindCountry = (border) => {
      countryName.value = data.find((item) => {
        if (item.alpha3Code === border) return item
      }).name

      countryId = countryName.value
      router.push({ name: 'country', params: { id: countryName.value } })
    }

    const singleCountry = computed(() => {
      let filtered = []
      if (countryId === countryName.value) {
        filtered = data.find((item) => {
          if (item.name === countryId) return item
        })
      } else {
        filtered = data.find((item) => {
          if (item.name === countryId) return item
        })
      }
      return filtered
    })

    watch(
      () => route.path,
      (newPath, oldPath) => {
        countryId = route.params.id
      }
    )

    return { singleCountry, FindCountry, countryName, currentPath, currentRoute }
  }
}
</script>
<style lang="scss" scoped>
.container * {
  font-size: 14px;
}
.details {
  margin-top: 3%;
}
.row:first-of-type {
  margin-top: 4%;
}

h2 {
  font-weight: 800;
}
.list-group-item {
  padding: 2px 0;
  margin-top: 5px;
  span:first-of-type {
    font-weight: 600;
    margin-right: 3px;
  }
  span:nth-of-type(2) {
    font-weight: normal;
  }
}
.border {
  background: var(--light-bg);
  padding: 3px 28px;
  font-size: 14px;
  margin-right: 5px;
  margin-left: 3px;
  font-family: var(--main-font);

  font-size: 12px;
  font-weight: 600;
}
.border-title {
  width: 100%;
}
.border-count {
  width: 100%;
}
/*****************************/
@media (min-width: 768px) {
  .details {
    margin-top: 1%;
  }
  .list-group-item {
    margin-top: 5px;
  }
  .border-title {
    width: 30%;
  }
  .border-count {
    width: 70%;
  }
}
@media (min-width: 1024px) {
  .container * {
    font-size: var(--detail-page-fs);
  }
  .details {
    margin-top: 3%;
  }
}
</style>
