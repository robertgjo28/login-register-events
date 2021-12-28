<template>
  <main>
    <the-header></the-header>
    <div class="container mt-5 pt-3">
      <h2>Register new Event!</h2>

      <form class="mt-5">
        <div class="mb-3">
          <label for="eventName" class="form-label">Event Name</label>
          <input
            type="text"
            class="form-control"
            v-model="values.eventName"
            id="eventName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="eventName" class="form-label">Event Date</label>
          <input
            type="date"
            :min="dateToYYYYMMDD(myDate)"
            @input="values.eventDate = $event.target.valueAsDate"
            class="form-control"
            id="eventName"
            required
          />
        </div>

        <label for="formFile" class="form-label"
          >Event Cover ( Press the Upload button frist, then go below. )</label
        >

        <div class="input-group mb-3">
          <input
            type="file"
            accept="image/*"
            class="form-control"
            id="formFile"
            @change="previewImage"
            required
          />
          <button @click.prevent="uploadIMG" class="input-group-text">
            Upload
          </button>
          <progress
            :value="uploadValue"
            max="100"
            class="w-100 mt-3 bg-danger"
          ></progress>
        </div>
        <div class="mb-3">
          <label for="eventDesc" class="form-label">Event description</label>
          <textarea
            class="form-control"
            id="eventDesc"
            v-model="values.eventDesc"
            rows="6"
            required
          ></textarea>
        </div>
        <button
          class="btn btn-login px-5 fw-bold float-end mt-3"
          @click.prevent="getData()"
        >
          Submit
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import TheHeader from "@/components/Events/TheHeader.vue";
import store from "@/store";
import { storage, eventsCollection } from "@/includes/firebase.js";

export default {
  components: { TheHeader },

  data() {
    return {
      myDate: new Date(),
      values: { eventName: "", eventDesc: "", eventDate: "" },
      imageData: null,
      picture: null,
      uploadValue: 0,
    };
  },

  beforeRouteEnter(to, from, next) {
    if (store.state.userLoggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  },

  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    uploadIMG() {
      var storageRef = storage.ref();

      var uploadTask = storageRef
        .child(this.imageData.name)
        .put(this.imageData);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          alert("Unexpected error happened, the message is: " + error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.picture = downloadURL;
          });
        }
      );
    },

    async getData() {
      if (
        this.values.eventName === "" ||
        this.values.eventDesc === "" ||
        this.values.eventDate === ""
      ) {
        alert("Something is wrong, please check your fields!");

        return;
      }
      try {
        await eventsCollection.add({
          eventName: this.values.eventName,
          eventDesc: this.values.eventDesc,
          eventDate: this.values.eventDate,
          eventPicture: this.picture,
        });
      } catch (error) {
        alert("Unexpected error happened, the message is: " + error.message);
      }

      this.$router.push("/");
    },
    dateToYYYYMMDD(d) {
      return (
        d &&
        new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
          .toISOString()
          .split("T")[0]
      );
    },
  },
};
</script>
