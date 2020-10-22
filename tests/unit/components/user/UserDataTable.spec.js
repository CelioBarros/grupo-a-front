import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import $t from "$t";
import flushPromises from "flush-promises";
import UserDataTable from "@/components/user/UserDataTable";

describe("UserDataTable Component", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const stubs = {
    VDataTable: {
      name: "v-data-table",
      template: '<div class="v-data-table-stub"></div>'
    },
    VSnackbar: true,
    VBtn: true,
    VIcon: true,
    VCard: true,
    VCardTitle: true,
    VCardText: true,
    VCardActions: true,
    VTextField: true,
    VSpacer: true
  };
  const resultGetUser = { data: { totalElements: 1, content: [] } };

  const store = {
    modules: {
      user: {
        namespaced: true,
        actions: {
          getUsers: jest.fn().mockResolvedValue(resultGetUser),
          deleteUser: jest.fn()
        }
      }
    }
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mountWrapper(localVue, stubs, store);
    jest.clearAllMocks();
  });

  describe("watch", () => {
    test("should call #loadUsersDebounced when data reloadTable changes to true", async () => {
      const loadUsersDebouncedSpy = jest.spyOn(
        wrapper.vm,
        "loadUsersDebounced"
      );
      expect(loadUsersDebouncedSpy).not.toHaveBeenCalled();

      wrapper.vm.search = "nova busca";
      await flushPromises();

      expect(loadUsersDebouncedSpy).toHaveBeenCalled();
    });
    test("should call #loadUsers when data options changes", async () => {
      const loadUsersSpy = jest.spyOn(wrapper.vm, "loadUsers");
      expect(loadUsersSpy).not.toHaveBeenCalled();

      wrapper.vm.options = {
        page: 2,
        itemsPerPage: 10,
        sortBy: ["id"],
        sortDesc: [false]
      };
      await flushPromises();

      expect(loadUsersSpy).toHaveBeenCalled();
    });
  });

  describe("methods", () => {
    describe("#call savedUser", () => {
      test("should call loadUsers", async () => {
        const loadUsersSpy = jest.spyOn(wrapper.vm, "loadUsers");
        expect(loadUsersSpy).not.toHaveBeenCalled();

        wrapper.vm.savedUser();
        await flushPromises();

        expect(loadUsersSpy).toHaveBeenCalled();
      });
      test("should change text", async () => {
        wrapper.vm.text = "";
        expect(wrapper.vm.text).toBe("");

        wrapper.vm.savedUser();
        await flushPromises();

        expect(wrapper.vm.text).toBe("components.user.data-table.saved");
      });
      test("should change snackbar to true", async () => {
        wrapper.vm.snackbar = false;
        expect(wrapper.vm.snackbar).toBeFalsy();

        wrapper.vm.savedUser();
        await flushPromises();

        expect(wrapper.vm.snackbar).toBeTruthy();
      });
    });
  });
});

function mountWrapper(localVue, stubs, store) {
  return shallowMount(UserDataTable, {
    localVue,
    stubs,
    mocks: {
      $t,
      $store: new Vuex.Store(store),
      $vuetify: {
        theme: {
          dark: false
        }
      }
    }
  });
}
