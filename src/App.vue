<template>
  <div id="app">
    <v-app id="auth-app">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in menuItems"
            :to="item.to"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar id="asus-top-bar" elevation="0" fixed app>
        <v-toolbar-title>
          <img src="@/assets/logo-grupoa.webp" alt="logo" class="pt-2" />
        </v-toolbar-title>
      </v-app-bar>
    </v-app>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          icon: "mdi-home",
          title: this.$t("navigation-item.home")
        },
        {
          icon: "mdi-account-cog",
          title: this.$t("navigation-item.user"),
          to: "/"
        }
      ]
    };
  }
};
</script>
<style></style>
