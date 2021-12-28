<template>
  <section class="pb-5">
    <main v-if="!currentItem">
      <h3 class="text-start">
        Hello there, <span class="displayName">{{ displayName }}</span>
      </h3>
      <p></p>
      <div class="text-center mb-5">
        <h1 class="mt-tablet">Events</h1>
        <p>Search events and add new events!</p>
      </div>

      <div class="row">
        <div class="col-12 mb-5">
          <input
            class="form-control search-control"
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
          />
          <i
            class="fas fa-times fa-2x"
            v-if="searchQuery"
            @click="clearInput"
          ></i>
          <router-link
            to="/events/register"
            class="btn-login float-end fw-bold btn py-3 px-5 mb-2"
            >Add new Event</router-link
          >
        </div>
        <table class="table table-hover">
          <thead class="text-center">
            <th>#</th>
            <th>Cover Picture</th>
            <th>Event & Description</th>
            <th>Date</th>
            <th>Tools</th>
          </thead>
          <tbody>
            <tr v-for="(event, index) in resultQuery" :key="event.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">
                <img
                  :src="event.eventPicture"
                  height="200"
                  width="200"
                  alt=""
                />
              </td>
              <td class="w-50 py-4">
                <h3>{{ event.eventName }}</h3>
                <p>{{ event.eventDesc }}</p>
              </td>
              <td class="text-center">
                <span class="lead">{{
                  event.eventDate.toDate().toISOString().split("T")[0]
                }}</span>
              </td>
              <td class="text-center">
                <i
                  class="far fa-edit me-3 fa-2x"
                  @click.prevent="onEdit(index)"
                ></i>
                <i
                  class="far fa-trash-alt fa-2x"
                  @click.prevent="
                    accountToggle();
                    getIndex(index);
                  "
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- // Edit Event -->

    <main v-else>
      <h3 class="mb-5">Edit Event: {{ currentItem.eventName }}</h3>
      <form>
        <div class="mb-3">
          <label for="eventName" class="form-label">Event Name</label>
          <input
            type="email"
            class="form-control"
            v-model="currentItem.eventName"
            id="eventName"
          />
        </div>
        <div class="mb-3">
          <label for="eventDate" class="form-label">Event Date</label>
          <input
            type="date"
            class="form-control"
            id="eventDate"
            :min="dateToYYYYMMDD(myDate)"
            @input="currentItem.eventDate = $event.target.valueAsDate"
          />
        </div>
        <div class="mb-3">
          <label for="eventDesc" class="form-label">Event description</label>
          <textarea
            class="form-control"
            v-model="currentItem.eventDesc"
            id="eventDesc"
            rows="6"
          ></textarea>
        </div>

        <div class="text-end">
          <button
            class="btn btn-signout px-4 float-right fw-bold"
            @click.prevent="currentItem = null"
          >
            Cancel
          </button>
          <button
            class="btn btn-login ms-3 px-4 float-right fw-bold"
            @click.prevent="updateBase"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  

  <div class="modal-hmm" v-if="modalToggle">
    <span class="close" title="Close Modal">&times;</span>
    <form class="modal-content-hmm">
      <div class="container-hmm">
        <h1 class="text-center">Delete Event</h1>
        <p class="text-center lead">
          Are you sure you want to delete your Event?
        </p>
        <h3 class="text-center text-danger">{{ deleteItem.eventName }}</h3>
        <div class="text-center mt-5 pt-3">
          <button
            type="button"
            @click.prevent="accountToggle"
            class="btn btn-signout px-5"
          >
            Cancel
          </button>
          <button
            type="button"
            @click.prevent="deleteEvent(index)"
            class="btn btn-login ms-3 px-5"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  </div>
  </section>
</template>

<script>
import { eventsCollection, auth } from "@/includes/firebase";

export default {
  name: "ListEvents",

  data() {
    return {
      events: [],
      searchQuery: "",
      docID: "",
      myDate: new Date(),
      currentItem: null,
      deleteItem: null,
      users: [],
      user: null,
      displayName: null,
      email: null,
      modalToggle: false,
      eventChanged: {
        eventName: "",
        eventDesc: "",
        eventDate: "",
      },
    };
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.events.filter((event) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                event.eventName.toLowerCase().includes(v) ||
                event.eventDesc.toLowerCase().includes(v) ||
                event.eventDate.toDate().toISOString().includes(v)
            );
        });
      } else {
        return this.events;
      }
    },
  },

  async created() {
    // Get EVENTS Collection
    await eventsCollection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.events.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });

    const user = auth.currentUser;
    if (user !== null) {
      this.displayName = user.displayName;
      this.email = user.email;
    }
  },

  methods: {
    clearInput() {
      this.searchQuery = "";
    },

    onEdit(index) {
      if (this.resultQuery.length < index) {
        return;
      }

      this.currentItem = this.resultQuery[index];
    },

    accountToggle() {
      this.modalToggle = !this.modalToggle;
    },

    getIndex(index) {
      if (this.resultQuery.length < index) {
        return;
      }

      this.deleteItem = this.resultQuery[index];

      console.log(this.deleteItem);
    },

    async updateBase() {
      await eventsCollection.doc(this.currentItem.docID).update({
        eventDate: this.currentItem.eventDate,
        eventName: this.currentItem.eventName,
        eventDesc: this.currentItem.eventDesc,
      });

      window.location.replace("/");
    },

    async deleteEvent() {
      await eventsCollection.doc(this.deleteItem.docID).delete();

      window.location.replace("/");
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

<style scoped>
td {
  vertical-align: middle;
}

.fa-2x {
  font-size: 1.7rem;
  cursor: pointer;
}

.search-control {
  width: 50%;
  display: inline-block;
}

.fa-edit {
  color: #191654;
}

.btn-signout {
  background-color: #191654;
  color: #fff;
}

.btn-signout:hover {
  color: #fff;
  transform: scale(1.05);
}

.fa-times {
  cursor: pointer;
  position: relative;
  left: -35px;
  top: 5px;
  color: #191654;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fa-trash-alt {
  color: rgba(251, 191, 36, 1);
}

.displayName {
  background-color: #191654;
  color: #fff;
  padding: 10px 15px;
  border-radius: 6px;
}

/* Add a color to the cancel button */
.cancelbtn {
  background-color: #ccc;
  color: #fff;
}

/* Add a color to the delete button */
.deletebtn {
  background-color: #f44336;
}

/* Add padding and center-align text to the container */
.container-hmm {
  padding: 100px 16px;
}

/* The Modal (background) */
.modal-hmm {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content-hmm {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  width: 40%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* The Modal Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and delete button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .deletebtn {
    width: 100%;
  }
}

@media only screen and (max-width: 768px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead th {
    display: none;
  }

  tr {
    margin: 0 0 1rem 0;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    width: 100% !important;
  }

  td:before {
    position: absolute;
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    padding-top: 10px;
  }

  td:nth-of-type(1):before {
    content: "#";
  }
  td:nth-of-type(4):before {
    content: "Date";
  }
  td:nth-of-type(5):before {
    content: "Tools";
  }
}

@media only screen and (max-width: 820px) {
  .mt-tablet {
    padding-top: 30px;
  }

  .modal-content-hmm {
    width: 70%;
  }

  .close {
    display: none;
  }
}
@media only screen and (max-width: 425px) {
  .float-end {
    float: none !important;
    margin-top: 10px;
  }
  .modal-content-hmm {
    width: 90%;
  }
}
</style>
