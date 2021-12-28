<template>
  <main>
    <div class="row">
      <div class="col-md-7">
        <step-business></step-business>
      </div>
      <div class="col-md-5 background-image center-div">
        <left-side></left-side>
      </div>
    </div>
  </main>
</template>

<script>
import StepBusiness from "@/components/Registration/StepBusiness.vue";
import LeftSide from "@/components/Home/LeftSide.vue";
import store from "@/store";

export default {
  name: "BusinessRegister",

  components: { StepBusiness, LeftSide },
  beforeRouteEnter(to, from, next) {
    if (!store.state.userLoggedIn) {
      next();
    } else {
      next({ name: "Events" });
    }
  },
};
</script>
