<template>
  <v-data-table
    id="application-table"
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalItems"
    class="elevation-0 transparent"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex">
        <tooltip>
          <v-btn
            :id="'btn-edit-' + item.id"
            slot="button"
            nuxt
            icon
            @click="editUser(item)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <span slot="text">
            {{ $t("components.user.data-table.tooltip.edit") }}
          </span>
        </tooltip>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";
import Tooltip from "@/components/utils/Tooltip";

export default {
  name: "UserDataTable",
  components: {
    Tooltip
  },
  data() {
    return {
      users: [],
      userSelected: {},
      options: {
        size: 10,
        page: 1,
        sortBy: ["name"],
        sortDesc: [false]
      },
      totalItems: 0,
      loading: false,
      headers: [
        {
          text: this.$t("components.user.data-table.header.ra"),
          value: "ra"
        },
        {
          text: this.$t("components.user.data-table.header.name"),
          value: "name"
        },
        {
          text: this.$t("components.user.data-table.header.cpf"),
          value: "cpf"
        },
        {
          text: this.$t("components.user.data-table.header.actions"),
          sortable: false,

          value: "actions"
        }
      ]
    };
  },
  watch: {
    options: {
      handler() {
        this.loadUsers();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("user", ["getUsers"]),
    loadUsers() {
      this.loading = true;
      this.users = [];
      const sort = this.options.sortBy[0]
        ? `${this.options.sortBy[0]},${
            this.options.sortDesc[0] ? "desc" : "asc"
          }`
        : undefined;
      this.getUsers({
        page: this.options.page - 1,
        size: this.options.itemsPerPage,
        sort
      })
        .then(result => {
          this.totalItems = result.data.totalElements;
          this.users = result.data.content;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editUser(item) {
      this.userSelected = item;
    }
  }
};
</script>
