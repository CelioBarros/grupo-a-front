import Vue from "vue";

export default {
  getUsers(context, params) {
    return Vue.axios.get(`users/`, { params });
  },
  saveUser(context, user) {
    return Vue.axios.post(`users/`, user);
  },
  editUser(context, user) {
    return Vue.axios.put(`users/${user.ra}`, user);
  },
  deleteUser(context, ra) {
    return Vue.axios.delete(`users/${ra}`);
  }
};
