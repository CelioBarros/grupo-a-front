<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('components.user.data-table.search')"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn>
        {{ $t("components.user.data-table.add-button") }}
      </v-btn>
    </v-card-title>
    <v-data-table
      id="application-table"
      :headers="headers"
      :items="users"
      :options.sync="options"
      :server-items-length="totalItems"
      class="elevation-0 transparent"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-inline-flex">
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
          <tooltip>
            <v-btn
              :id="'btn-delete-' + item.id"
              slot="button"
              nuxt
              icon
              @click="deleteUser(item)"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <span slot="text">
              {{ $t("components.user.data-table.tooltip.delete") }}
            </span>
          </tooltip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";
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
      search: "",
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
          align: "right",
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
    },
    search(value) {
      this.loadUsersDebounced();
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
        sort,
        name: this.search
      })
        .then(result => {
          this.totalItems = result.data.totalElements;
          this.users = result.data.content;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadUsersDebounced: _.debounce(function() {
      this.options.page === 1 ? this.loadUsers() : (this.options.page = 1);
    }, 500),
    editUser(item) {
      this.userSelected = item;
    },
    deleteUser(item) {
      this.userSelected = item;
    }
  }
};
</script>
