<template>
  <div class="col-md-12 background-image center-div">
    <div class="col-8">
      <div>
        <i class="fas fa-quote-left fa-2x mb-4"></i>
      </div>
      <div>
        <p>“{{ quotes }}”</p>
      </div>
      <div class="mt-3">
        <p class="lead">― {{ author }}</p>
      </div>
      <div class="shape float-end"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      quotes: "",
      author: "",
    };
  },

  created() {
    var options = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "303a76eff1msh109a6ab637e3a7bp1ca5aajsn738d575b02f1",
      },
    };

    axios
      .request(options)
      .then((response) => {
        this.quotes = response.data.content;
        this.author = response.data.originator.name;
      })
      .catch((error) => {
        alert("Unexpected error happened, the message is: " + error);
      });
  },
};
</script>
