<template>
  <div class="container pt-3 mt-5">
    <div class="row">
      <div class="col-12">
        <list-events></list-events>
      </div>
    </div>
  </div>
</template>

<script>
import ListEvents from "./ListEvents.vue";

export default {
  components: { ListEvents },
};
</script>
