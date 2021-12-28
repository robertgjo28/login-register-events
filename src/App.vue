<template>
  <main>
    <div class="container-fluid m-0 p-0">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userLoggedIn"]),
  },

  created() {
    this.$store.dispatch("init_login");
  },
};
</script>

<style>
body {
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}

.background-image {
  height: 100vh;
  background: url("./assets/img/bg-left.svg");
  background-size: cover;
  color: #fff;
}

.center-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shape {
  width: 0px;
  height: 0px;
  border-right: 30px solid #fff;
  border-top: 30px solid #fff;
  border-left: 30px solid transparent;
  border-bottom: 30px solid #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.btn-google {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  padding: 13px 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.btn-google:hover {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

.btn-login {
  background: #43c6ac;
  background: -webkit-linear-gradient(to right, #191654, #43c6ac);
  background: linear-gradient(to right, #191654, #43c6ac);
  color: #fff !important;
  border: none !important;
  transition: all 0.3s ease-in;
  padding: 13px 0;
}

.btn-login:hover {
  color: #fff;
  border: none;
  background: #43c6ac;
  background: -webkit-linear-gradient(to left, #191654, #43c6ac);
  background: linear-gradient(to left, #191654, #43c6ac);
  transform: scale(1.1);
}

.input-hand {
  cursor: pointer;
}

input {
  height: 60px;
  border-radius: 6px;
}

button {
  height: 60px;
  font-size: 17px;
}

input:focus {
  border: 1px solid #ced4da !important;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11) !important;
}

select:focus {
  border: 1px solid #ced4da !important;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11) !important;
}

label {
  font-size: 17px;
  line-height: 19px;
  color: #696f79;
}

.paragraph-shock {
  color: #8692a6;
  font-size: 18px;
  width: 50%;
}

.account-registration {
  color: #8692a6;
  font-size: 17px;
  line-height: 28px;
}

.input-group-text {
  background-color: #fff !important;
  color: #191654 !important;
}

.account-link {
  color: #191654;
  text-decoration: none;
}

.text-gray {
  color: #8692a6;
  padding-top: 5px;
  font-size: 15px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollable::-webkit-scrollbar {
  display: none;
}

.no-padding {
  padding-left: 3rem;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollable {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media only screen and (max-width: 820px) {
  .account-information {
    width: 100% !important;
    height: 150px !important;
  }
  .pentagon {
    margin: 65px 0 0 90px !important;
  }
  account-information:hover .fa-arrow-right {
    display: none;
  }

  body {
    overflow-x: hidden;
  }
}

@media only screen and (max-width: 425px) {
  .background-image {
    height: 45vh;
  }
  .scrollable {
    width: 100%;
    margin: 0 auto;
  }

  .btn-google {
    width: 100%;
  }

  .pentagon {
    margin: 65px 0 0 120px !important;
  }

  .paragraph-shock {
    width: 100% !important;
  }

  .no-padding {
    margin-left: 0px !important;
  }
}
</style>
