import Vue from "vue";

export default {
  getUsers(context, params) {
    return Vue.axios.get(`users/`, { params });
  },
  getUsersList(context) {
    return Vue.axios.get(`users/list`);
  },
  getUserById(context, id) {
    return Vue.axios.get(`users/${id}`);
  },
  saveUser(context, user) {
    return Vue.axios.post(`users/`, user);
  },
  editUser(context, user) {
    return Vue.axios.put(`users/${user.id}`, user);
  },
  deleteUser(context, id) {
    return Vue.axios.delete(`users/${id}`);
  }
};
