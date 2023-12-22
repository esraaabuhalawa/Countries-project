<template>
  <div class="container justify-content-center pt-5">
    <router-link to="/">
      <button class="back"><i class="fa-solid fa-arrow-left-long"></i> Back</button>
    </router-link>
    <div class="py-5 justify-content-center d-flex flex-column align-items-center error mt-2">
      <p>Error 404</p>
      <p class="mx-auto text-center">Page Not Found</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
p {
  font-size: 3rem;
  font-weight: 600;
}
.error {
  p:first-of-type {
    color: red;
  }
  p:nth-of-type(2) {
    color: #000;
  }
}
</style>
