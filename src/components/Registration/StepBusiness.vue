<template>
  <main>
    <div class="row scrollable" v-if="activePhase === 1">
      <div class="col-10 mx-auto pt-5 mt-5">
        <p class="account-registration">
          <span class="float-start"
            ><router-link to="/register" class="gray-back">
              <i class="fas fa-chevron-left me-2"></i>Back</router-link
            ></span
          >
          <span class="float-end">STEP 01/02</span>
        </p>
      </div>
      <div class="col-10 m-auto pt-5">
        <div class="row d-flex justify-content-center align-items-center m-0">
          <div class="col-12 text-start ps-5 ms-5">
            <h3 class="pb-2">Register account for your Business!</h3>
            <p class="paragraph-shock w-50">
              For the purpose of industry regulation, your details are required.
            </p>
          </div>
          <div class="col-8 m-auto text-start">
            <form>
              <div class="form-group mt-4">
                <label class="label-username pb-2" for="companyname"
                  >Company name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="companyname"
                  v-model="values.companyName"
                />
              </div>
              <div class="form-group mt-4">
                <label class="label-username pb-2" for="fullname"
                  >Full name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="fullname"
                  v-model="values.fullName"
                />
              </div>
              <div class="form-group mt-4">
                <label class="label-username pb-2" for="email"
                  >Email address</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="email"
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
                  type="button"
                  class="btn btn-login"
                  @click.prevent="getInfoFromFirst()"
                >
                  Register
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
          <div class="d-grid gap-2 col-8 mx-auto pb-5">
            <button
              class="btn btn-google"
              type="button"
              @click.prevent="googleSignIn()"
            >
              <img
                src="../../assets/img/google.png"
                width="25"
                height="25"
                alt="Google Logo"
                class="me-3"
              />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row scrollable pb-4" v-if="activePhase === 2">
      <div class="col-10 mx-auto mt-5">
        <p class="account-registration">
          <span class="float-end">STEP 02/02</span>
        </p>
      </div>
      <div class="col-10 m-auto mt-5 pt-5">
        <div class="row d-flex justify-content-center align-items-center m-0">
          <div class="col-12 text-start ps-5 ms-5">
            <h3 class="pb-2">Complete Your Profile!</h3>
            <p class="paragraph-shock w-50">
              For the purpose of industry regulation, your details are required.
            </p>
          </div>
          <div class="col-8 m-auto text-start">
            <form>
              <div class="form-group mt-4">
                <label class="label-username pb-2" for="username"
                  >Username</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="values.username"
                />
              </div>
              <div class="form-group mt-4">
                <label class="label-username pb-2" for="phone"
                  >Phone number</label
                >
                <div class="input-group mb-3">
                  <select
                    class="form-select select-edited"
                    v-model="values.phoneDial"
                  >
                    <option
                      v-for="country in countries"
                      :key="country.code"
                      :value="country.dial_code"
                    >
                      {{ country.dial_code }} {{ country.flag }}
                    </option>
                  </select>
                  <input
                    type="text"
                    class="form-control"
                    v-model="values.phoneNumber"
                  />
                </div>
              </div>
              <div class="form-group mt-4">
                <label class="label-username pb-2" for="address"
                  >Your address</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="values.address"
                />
              </div>
              <div class="form-group mt-4">
                <label class="label-password pb-2" for="country"
                  >Country of residence</label
                >
                <select
                  class="form-select form-select mb-3"
                  v-model="values.country"
                >
                  <option selected disabled>Enter your country</option>
                  <option
                    v-for="country in countries"
                    :value="country.name"
                    :key="country.code"
                  >
                    {{ country.name }}
                    {{ country.flag }}
                  </option>
                </select>
              </div>
              <div class="d-grid gap-2 col-8 mx-auto pt-5 pb-4">
                <button
                  class="btn btn-login"
                  @click.prevent="getInfoFromSec()"
                  type="button"
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import countries from "@/includes/country_dial_info.json";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      activePhase: 1,
      countries: countries,
      showPassword: false,
      values: {
        companyName: "",
        fullName: "",
        email: "",
        password: "",
        username: "",
        phoneDial: "",
        phoneNumber: "",
        address: "",
        country: "",
      },
    };
  },

  methods: {
    ...mapActions(["googleSignIn"]),

    goToStep(step) {
      this.activePhase = step;
    },

    // Checking for email & checking for empty fields
    async getInfoFromFirst() {
      if (
        this.values.companyName === "" ||
        this.values.fullName === "" ||
        this.values.email === "" ||
        this.values.password === ""
      ) {
        alert("Something is missing, check and try again!");
        this.activePhase = 1;
        return;
      }

      try {
        await this.$store.dispatch("register", this.values);
        this.activePhase = 2;
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/email-already-in-use") {
          alert("Already exists an account with the given email address.");
          this.activePhase = 1;
        } else if (errorCode == "auth/invalid-email") {
          alert("The email address is not valid.");
          this.activePhase = 1;
        } else {
          alert(errorMessage);
          this.activePhase = 1;
        }
        alert("Unexpected error happened, the message is: " + error);

        return;
      }
    },

    // Checking for empty fields & pushing into FireBase

    async getInfoFromSec() {
      if (
        this.values.username === "" ||
        this.values.phoneDial === "" ||
        this.values.phoneNumber === "" ||
        this.values.address === "" ||
        this.values.country === ""
      ) {
        alert("Check Again!");
        this.activePhase = 2;
      }

      try {
        await this.$store.dispatch("submitDataBusiness", this.values);
        window.location.replace("/");
      } catch (error) {
        alert("An unexpected error occured. Please try again later!");
      }
    },
  },
};
</script>

<style scoped>
.scrollable {
  height: 100vh;
  overflow-y: scroll;
}

.gray-back {
  font-size: 16px;
  color: #8692a6;
  text-decoration: none;
  font-weight: 500;
  background: none;
  border: none;
}

select {
  height: 60px;
  border-radius: 6px;
}

.form-select {
  flex: none !important;
}

.select-edited {
  width: 20% !important;
}
</style>
