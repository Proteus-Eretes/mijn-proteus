<template>
  <div class="navbar bg-primary">
    <div class="flex-1">
      <NuxtLink to="/" title="D.S.R. Proteus-Eretes" class="btn btn-ghost">
        <img
          class="h-10 max-lg:hidden"
          src="~/assets/logo/internal-white.png"
          alt="D.S.R. 'Proteus-Eretes'"
        />
        <img
          class="h-12 lg:hidden"
          src="~/assets/logo/traditional.png"
          alt="D.S.R. 'Proteus-Eretes'"
        />
      </NuxtLink>
    </div>
    <div class="flex-none">
      <div class="form-control">
        <input
          type="text"
          placeholder="Zoeken"
          class="input input-bordered input-ghost"
        />
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Theme</a></li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
