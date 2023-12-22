<template>
  <nav>
    <div class="container">
      <div class="d-flex justify-content-between align-items-baseline pt-3 pb-2">
        <section>
          <h1>Where in the world ?</h1>
        </section>
        <section class="ms-auto">
          <div v-show="!showMode" @click="setTheme('dark')" class="align-self-baseline">
            <span class="icon">
              <i class="fa-solid fa-moon"></i>
            </span>
            <span class="darkmode">Dark Mode</span>
          </div>
         
          <div v-show="showMode" @click="setTheme('light')" class="align-self-baseline">
            <span class="icon1">
              <i class="fa-regular fa-sun"></i>
            </span>
            <span class="lightmode"> Light Mode</span>
          </div>
        </section>
      </div>
    </div>
  </nav>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const currentTheme = ref('light');
    
    const showMode = ref(true)
    const setTheme = (theme) => {
      // Set the theme in localStorage
      localStorage.setItem('theme', theme);
    
      // Update the currentTheme variable
      currentTheme.value = theme;
      showMode.value = !showMode.value
      // Apply the theme to the document using data-bs-theme
      applyTheme(theme);
    };

    const applyTheme = (theme) => {
      // Remove existing theme class
      document.body.removeAttribute('data-bs-theme');

      // Apply the new theme using data-bs-theme
      document.body.setAttribute('data-bs-theme', theme);
    };

    // Load the theme from localStorage when the component is mounted
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        currentTheme.value = savedTheme;
        applyTheme(savedTheme);
      }
    });

    return {
      currentTheme,
      setTheme,
      showMode
    };
  },
};
</script>
<style lang="scss" scoped>
nav {
  padding: 10px 5px;
  margin-bottom: 30px;
}
h1 {
  font-size: 15px;
  font-weight: 800;
}
.darkmode,
.lightmode {
  margin-left: 4px;
  font-size: 11px;
  font-weight: 300;
  vertical-align: middle;
}
.icon1 svg {
  color: var(--light-bg);
}
svg {
  font-size: 12px;
}

@media (min-width: 768px) {
  nav {
    margin-bottom: 40px;
  }
  h1 {
    font-size: 20px;
  }
  .darkmode,
  .lightmode {
    font-size: 14px;
    vertical-align: top;
  }
  svg {
    font-size: 15px;
  }
  .darkmode,
  .lightmode:hover {
    cursor: pointer;
  }
}
@media (min-width: 1024px) {
  nav {
    margin-bottom: 50px;
  }
}
</style>
