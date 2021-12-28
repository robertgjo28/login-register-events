<template>
  <main>
    <div class="row">
      <div class="col-md-5 background-image center-div">
        <left-side></left-side>
      </div>
      <div class="col-md-7">
        <div class="row">
          <div class="col-10 text-end pt-5 mt-5">
            <p class="account-registration">
              Already have an account?
              <router-link class="account-link" to="/login"
                >Sign In.</router-link
              >
            </p>
          </div>
          <div class="col-10 m-auto pt-5">
            <div
              class="row d-flex justify-content-center align-items-center m-0"
            >
              <div class="col-12 text-start no-padding ms-5">
                <h3 class="pb-2">Join Us!</h3>
                <p class="paragraph-shock">
                  To begin this journey, tell us what type of account you’d be
                  opening.
                </p>
              </div>
              <div class="col-10 mx-auto text-start">
                <router-link
                  to="/register/individual"
                  class="account-information center-div mt-4"
                >
                  <div class="me-4">
                    <div class="pentagon">
                      <i class="fas fa-user-alt fa-2x text-white"></i>
                    </div>
                  </div>
                  <div class="me-5 pe-3">
                    <h4 class="header-join">Individual</h4>
                    <p class="subheader">Personal account to see events.</p>
                  </div>
                  <div>
                    <i class="fas fa-arrow-right fa-2x"></i>
                  </div>
                </router-link>
                <router-link
                  to="/register/business"
                  class="account-information center-div mt-4"
                >
                  <div class="me-4">
                    <div class="pentagon">
                      <i class="fas fa-briefcase fa-2x text-white"></i>
                    </div>
                  </div>
                  <div class="me-5 pe-4">
                    <h4 class="header-join">Business</h4>
                    <p class="subheader w-80">
                      Personal account to see events.
                    </p>
                  </div>
                  <div>
                    <i class="fas fa-arrow-right fa-2x"></i>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LeftSide from "@/components/Home/LeftSide.vue";
import store from "@/store";

export default {
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
};
</script>

<style scoped>
.account-information {
  height: 125px;
  width: 80%;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0px 2px 14px 1px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  text-decoration: none;
}

.account-information:hover {
  border: 1px solid #191654;
  box-shadow: 0px 4px 14px 1px rgba(0, 0, 0, 0.04);
  background: #f5f9ff;
}

.account-information:hover .fa-arrow-right {
  color: #191654;
}

.fa-user-alt {
  position: relative;
  top: -55px;
  left: 10px;
}

.fa-briefcase {
  position: relative;
  top: -55px;
  left: 10px;
}

.fa-arrow-right {
  color: #fff;
}

.header-join {
  color: #000;
}

.subheader {
  color: #8692a6;
}

.pentagon {
  margin: 65px 0 0 0;
  position: relative;
  width: 52px;
  box-sizing: content-box;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: #191654 transparent;
}
.pentagon:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  top: -85px;
  left: -18px;
  border-width: 0 45px 35px;
  border-style: solid;
  border-color: transparent transparent #191654;
}
</style>
