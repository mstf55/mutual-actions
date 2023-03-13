<template>
  <q-layout view="HHH Lpr fFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn color="white" text-color="black" dense label="List" to="/" v-if="$q.platform.is.desktop" />
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" v-if="$q.platform.is.mobile" />

        <q-toolbar-title></q-toolbar-title>

        <q-btn color="white" text-color="black" dense label="Add new" @click="addNew" v-if="$q.platform.is.desktop" />
        <q-btn text-color="white" flat dense round label="+" size="xl" @click="addNew" v-if="$q.platform.is.mobile" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-btn color="white" text-color="black" dense label="List" to="/" />
    </q-drawer>

    <q-drawer v-model="isOpen" side="right" bordered>
      <component :is="view"></component>
    </q-drawer>

    <q-page-container>
      <div class="py-2 mx-auto text-center text-sm"></div>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Lorem Ipsum sir lorem ipsum lore ipsum</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import useRightDrawer from 'src/stores/rightDrawer';
import { defineComponent, reactive, ref } from 'vue';
import TaskForm from 'src/components/TaskForm.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawer = useRightDrawer();

    // convert all state properties to reactive references to be used on view
    const { isOpen, view } = storeToRefs(rightDrawer);

    return {
      leftDrawerOpen,
      isOpen,
      view,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      addNew() {
        rightDrawer.open(TaskForm, {});
      }
    };
  },
});
</script>
