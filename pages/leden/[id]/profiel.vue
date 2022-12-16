<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
  </h1>
  <div class="overflow-x-auto shadow">
    <table class="table w-full">
      <tbody>
        <tr>
          <td>ID</td>
          <td>{{ member.id }}</td>
        </tr>
        <tr>
          <td>Initialen</td>
          <td>{{ member.initials }}</td>
        </tr>
        <tr>
          <td>Naam</td>
          <td>
            {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
          </td>
        </tr>
        <tr>
          <td>Geboortedatum</td>
          <td>{{ dateFormatter(member.dateOfBirth) }}</td>
        </tr>
        <tr>
          <td>Geslacht</td>
          <td>{{ member.sex }}</td>
        </tr>
        <tr>
          <td>Adres</td>
          <td>{{ member.street }} {{ member.number }} {{ member.city }}</td>
        </tr>
        <tr>
          <td>Postcode</td>
          <td>{{ member.zipcode }}</td>
        </tr>
        <tr>
          <td>Land</td>
          <td>{{ member.country }}</td>
        </tr>
        <tr>
          <td>Studies</td>
          <td>{{ member.studies }}</td>
        </tr>
        <tr>
          <td>Groepen</td>
          <td>{{ member.memberships }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Contact, Member, Membership, MemberStudy } from ".prisma/client";

const dateFormatter = useDateFormatter();

defineProps<{
  member: Member & {
    contacts: Contact[];
    studies: MemberStudy[];
    memberships: Membership[];
  };
}>();
</script>
