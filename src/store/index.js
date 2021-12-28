import { createStore } from "vuex";
import { auth, usersCollection, googleAuth } from "@/includes/firebase";

export default createStore({
  state: {
    userLoggedIn: false,
    userCred: null,
    accountInfo: false,
  },
  mutations: {
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    toggleModal(state) {
      state.accountInfo = !state.accountInfo;
    },
  },
  actions: {
    async register({ state }, payload) {
      state.userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit("toggleAuth");
    },
    async submitData({ commit, state }, payload) {
      await usersCollection.doc(state.userCred.user.uid).set({
        name: payload.fullName,
        email: payload.email,
        username: payload.username,
        phone: payload.phoneDial + payload.phoneNumber,
        address: payload.address,
        country: payload.country,
      });

      await state.userCred.user.updateProfile({
        displayName: payload.fullName,
      });

      commit("toggleAuth");
    },

    async submitDataBusiness({ commit, state }, payload) {
      await usersCollection.doc(state.userCred.user.uid).set({
        company: payload.companyName,
        name: payload.fullName,
        email: payload.email,
        username: payload.username,
        phone: payload.phoneDial + payload.phoneNumber,
        address: payload.address,
        country: payload.country,
      });

      await state.userCred.user.updateProfile({
        displayName: payload.fullName,
      });

      commit("toggleAuth");
    },

    async signout({ commit }) {
      await auth.signOut();

      commit("toggleAuth");
      window.location.reload();
    },

    googleSignIn({ commit }) {
      const provider = new googleAuth.GoogleAuthProvider();

      auth.signInWithPopup(provider).then(() => {
        window.location.replace("/");
      });

      commit("toggleAuth");
    },

    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit("toggleAuth");
      }
    },
  },
});
