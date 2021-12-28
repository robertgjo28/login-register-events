<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand ms-5 ps-5" href="/">Test</a>

      <ul class="navbar-nav ms-auto mb-2 me-5 pe-5 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/">Events</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-signout px-3 ms-3"
            @click.prevent="signout"
            href="#"
            v-if="userLoggedIn"
            >Sign Out</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "TheHeader",

  computed: {
    ...mapState(["userLoggedIn"]),
    ...mapMutations(["toggleModal"]),
  },
  methods: {
    ...mapActions(["signout"]),
  },
};
</script>

<style scoped>
.navbar {
  background-color: #191654 !important;
}
.nav-link {
  color: #fff !important;
  font-size: 17px;
}

.navbar-brand {
  color: #fff !important;
  font-size: 25px;
  letter-spacing: 0.2rem;
}

.nav-signout {
  border: 1px solid #fff;
  border-radius: 6px;
  background-color: #fff;
  color: #191654 !important;
}

@media only screen and (max-width: 820px) {
  .navbar-nav {
    flex-direction: row !important;
    padding-top: 10px;
  }
}

@media only screen and (max-width: 425px) {
  .navbar-nav {
    margin-right: 0 !important;
  }
  .navbar-brand {
    margin-left: 0 !important;
  }
}
</style>
