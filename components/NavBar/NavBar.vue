<template>
  <div class="navbar p-0 mb-4">
    <div class="flex-1">
      <div class="dropdown">
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
      <NuxtLink
        to="/me"
        title="Profiel"
        class="btn btn-ghost btn-circle avatar"
      >
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface MenuItem {
  name: string;
  target: string;
  icon: string;
  children?: { name: string; target: string; icon: string }[];
}

const menuItems: MenuItem[] = [
  { name: "Roeien", icon: "material-symbols:rowing", target: "/roei" },
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
