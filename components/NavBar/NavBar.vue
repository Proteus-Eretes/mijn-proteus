<template>
  <div class="navbar fixed bg-base-100/80 backdrop-blur max-lg:bottom-0 z-30">
    <div class="flex-1">
      <div class="dropdown dropdown-top">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <Icon name="material-symbols:menu" size="24px" />
        </label>
        <NavBarMenuSmall :items="menuItems" />
      </div>
      <NuxtLink
        to="/"
        title="D.S.R. Proteus-Eretes"
        class="btn btn-ghost px-2 lg:px-4 max-w-fit flex-1"
      >
        <img
          class="max-h-10 max-w-50"
          src="~/assets/logo/external-color.png"
          alt="D.S.R. 'Proteus-Eretes'"
        />
      </NuxtLink>
    </div>
    <div class="flex-none">
      <NavBarMenuLarge :items="menuItems" class="hidden lg:flex" />
      <NavBarSearch />
      <Button
        v-if="status === 'unauthenticated'"
        title="Log in bij Proteus"
        color="primary"
        @click="() => signIn('proteus')"
      >
        Login
      </Button>
      <NavBarProfileDropdown v-if="status === 'authenticated'" />
    </div>
  </div>
  <span class="w-full min-h-16 mb-2 max-lg:hidden"></span>
</template>

<script lang="ts" setup>
export interface MenuItem {
  name: string;
  target: string;
  icon: string;
  children?: { name: string; target: string; icon: string }[];
}

const { status, signIn } = useSession();

const menuItems: MenuItem[] = [
  {
    name: "Roeien",
    icon: "material-symbols:rowing",
    target: "/roei",
    children: [
      {
        name: "Materiaal",
        icon: "material-symbols:inventory",
        target: "/material",
      },
    ],
  },
  { name: "Foto's", icon: "material-symbols:camera", target: "/foto" },
  {
    name: "Leden",
    icon: "material-symbols:person",
    target: "/lid",
    children: [
      {
        name: "Groepen",
        icon: "material-symbols:group",
        target: "/groups",
      },
      {
        name: "Lebberlijst",
        icon: "ph:graph",
        target: "/lebberlijst",
      },
    ],
  },
  {
    name: "Evenementen",
    icon: "material-symbols:calendar-today",
    target: "/event",
  },
];
</script>
