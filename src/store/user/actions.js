import Vue from "vue";

export default {
  getUsers(context, params) {
    return Vue.axios.get(`users/`, { params });
  },
  getUsersList(context) {
    return Vue.axios.get(`users/list`);
  },
  getUserById(context, ra) {
    return Vue.axios.get(`users/${ra}`);
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
