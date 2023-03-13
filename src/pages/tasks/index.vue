<template>
  <q-table flat bordered class="statement-table" title="Task List" :rows="taskList" :hide-header="grid" :columns="columns"
    row-key="__index" :grid="grid" :filter="filter" virtual-scroll :rows-per-page-options="[0]">
    <template v-slot:top-right="props">
      <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="q-pa-sm q-gutter-sm">
      </div>
    </template>

    <template #body-cell-title="props">
      <q-td key="title" :props="props">
        <RouterLink :to="`/tasks/${props.row.id}`">{{ props.row.title }}</RouterLink>
      </q-td>
    </template>

    <template #body-cell-tags="props">
      <q-td key="tags" :props="props">
        <q-chip dense size="xs" icon="bookmark" v-for="tag in props.row.tags" :key="tag">
          {{ tag }}
        </q-chip>
      </q-td>
    </template>

    <template #body-cell-state="props">
      <q-td :props="props">
        <q-chip :color="props.row.state === true ? 'green' : 'red'" text-color="white" dense class="text-weight-bolder"
          square>{{ props.row.state ? 'Completed' : 'Todo' }}</q-chip>
      </q-td>
    </template>
    <template #body-cell-action="props">
      <q-td :props="props">
        <q-btn dense flat round color="blue" field="edit" icon="edit" @click="update(props.row)"></q-btn>
      </q-td>
    </template>
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-list dense>
            <q-item v-for="col in props.cols" :key="col.name">
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <RouterLink v-if="col.name === 'title'" :to="`/tasks/${props.row.id}`">{{ props.row.title }}</RouterLink>
                <q-chip dense v-else-if="col.name === 'tags'" size="xs" icon="bookmark" v-for="tag in props.row.tags"
                  :key="tag">
                  {{ tag }}
                </q-chip>
                <q-chip v-else-if="col.name === 'state'" :color="props.row.state === true ? 'green' : 'red'"
                  text-color="white" dense class="text-weight-bolder" square>{{ col.value ? 'Completed' : 'Todo'
                  }}</q-chip>
                <q-btn v-else-if="col.name === 'action'" dense flat color="primary" field="edit" icon="edit"
                  @click="update(props.row)"></q-btn>
                <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">

import { ref, PropType, defineComponent, reactive, toRefs } from 'vue';
import { usetaskListStore } from 'src/stores/task';
import { storeToRefs } from 'pinia';
import useRightDrawer from 'src/stores/rightDrawer';
import { useRouter } from 'vue-router'
import TaskForm from 'src/components/TaskForm.vue';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'TaskTable',
  props: {
  },
  setup() {

    const storeTask = usetaskListStore();
    const rightDrawer = useRightDrawer();
    const router = useRouter()
    const $q = useQuasar()

    const { taskList } = storeToRefs(storeTask);

    const { changeTaskStatus } = storeTask;

    const fd = reactive({
      columns: [
        {
          name: 'title',
          required: true,
          label: 'title',
          field: 'title',
          align: 'left',
          sortable: false
        },
        { name: 'state', align: 'center', label: 'State', field: 'state', sortable: true },
        { name: 'endDate', label: 'endDate', field: 'endDate', sortable: true },
        { name: 'tags', label: 'Tags', field: 'tags', sortable: false },
        { name: 'description', label: 'Description', field: 'description', sortable: false },
        { name: 'action', label: 'Action', field: '', sortable: false }
      ]
    });

    return {
      filter: ref(''),
      ...toRefs(fd),
      taskList,
      router,
      grid: ref($q.platform.is.mobile),
      onRowClick: (row) => {
      },
      update: (row) => {
        rightDrawer.open(TaskForm, row);
      }
    };
  },
});
</script>

<style lang="scss" scoped></style>
