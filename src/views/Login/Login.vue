<template>
  <div class="row">
    <div class="col-md-5 background-image center-div">
      <left-side></left-side>
    </div>
    <div class="col-md-7">
      <div class="row scrollable">
        <div class="col-10 text-end pt-5 mt-5">
          <p class="account-registration">
            Don't have an account?
            <router-link class="account-link" to="/register"
              >Sign up.</router-link
            >
          </p>
        </div>
        <div class="col-10 m-auto">
          <div class="row d-flex justify-content-center align-items-center m-0">
            <div class="col-12 text-start ps-5 ms-5">
              <h3 class="pb-2">Login to see your events!</h3>
              <p class="paragraph-shock">Nice to see you again!</p>
            </div>
            <div class="col-8 m-auto text-start">
              <form>
                <div class="form-group mt-4">
                  <label class="label-username pb-2" for="username"
                    >Username or Email</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="username"
                    v-model="values.email"
                  />
                </div>
                <div class="form-group mt-4">
                  <label class="label-password pb-2" for="password"
                    >Password</label
                  >
                  <div class="input-group">
                    <input
                      :type="[showPassword ? 'text' : 'password']"
                      class="form-control password-borders"
                      id="password"
                      v-model="values.password"
                    />
                    <span
                      class="input-group-text input-hand"
                      @click="showPassword = !showPassword"
                    >
                      <i
                        class="fa"
                        :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
                <div class="d-grid gap-2 col-8 mx-auto pt-5 pb-4">
                  <button
                    class="btn btn-login"
                    type="button"
                    @click.prevent="login"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div class="col-7 mx-auto pb-4">
              <div class="row">
                <div class="col-5"><hr /></div>
                <div class="col-2 text-center text-gray">Or</div>
                <div class="col-5"><hr /></div>
              </div>
            </div>
            <div class="d-grid gap-2 col-8 mx-auto">
              <button
                class="btn btn-google"
                type="button"
                @click.prevent="googleSignIn()"
              >
                <img
                  src="@/assets/img/google.png"
                  width="25"
                  height="25"
                  alt="Google Logo"
                  class="me-3"
                />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "@/components/Home/LeftSide.vue";
import { mapActions } from "vuex";
import store from "@/store";

export default {
  name: "Login",
  components: {
    LeftSide,
  },
  beforeRouteEnter(to, from, next) {
    if (!store.state.userLoggedIn) {
      next();
    } else {
      next({ name: "Events" });
    }
  },
  data() {
    return {
      showPassword: false,
      values: { email: "", password: "" },
    };
  },

  methods: {
    ...mapActions(["googleSignIn"]),

    async login() {
      try {
        await this.$store.dispatch("login", this.values);
        window.location.replace("/");
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else if (errorCode === "auth/invalid-email") {
          alert("Invalid email.");
        } else if (errorCode === "auth/user-not-found") {
          alert("There is no user corresponding to the given email.");
        } else {
          alert(errorMessage);
        }
      }
    },
  },
};
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>
