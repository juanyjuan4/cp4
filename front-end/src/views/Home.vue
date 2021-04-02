<template>
  <div class="home">
    <h1>Profile Creator</h1>
    <p>Begin making your custom profile below!</p>
    <makeProfile></makeProfile>
  </div>
</template>

<script>
import makeProfile from "../components/makeProfile.vue"

export default {
  name: 'home',
  components: {
    makeProfile
  }
}
</script>
