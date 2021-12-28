<template>
  <main>
    <the-header></the-header>
    <div class="center-div">
      <the-content></the-content>
    </div>
  </main>
</template>

<script>
import store from "@/store";
import TheHeader from "@/components/Events/TheHeader.vue";
import TheContent from "@/components/Events/TheContent.vue";

export default {
  name: "Events",
  components: { TheHeader, TheContent },
  beforeRouteEnter(to, from, next) {
    if (store.state.userLoggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  },
};
</script>
