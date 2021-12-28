<template>
  <main>
    <div class="row">
      <div class="col-md-7">
        <step-individual></step-individual>
      </div>
      <div class="col-md-5 background-image center-div">
        <left-side></left-side>
      </div>
    </div>
  </main>
</template>

<script>
import StepIndividual from "@/components/Registration/StepIndividual.vue";
import LeftSide from "@/components/Home/LeftSide.vue";
import store from "@/store";
export default {
  components: {
    StepIndividual,
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
