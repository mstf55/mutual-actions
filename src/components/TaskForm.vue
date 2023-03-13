<template>
  <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form ref="myFormRef" greedy class="q-gutter-md" @submit.prevent.stop="onSubmit" @reset="onReset">
        <q-input v-model="form.title" outlined clearable label="Title*" lazy-rules :dense="dense" :rules="rules.title"
          mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS">
          <template #label>
            <div><span class="text-red-5">*</span> Title</div>
          </template>
        </q-input>

        <q-select label="tags" filled v-model="form.tags" use-input use-chips multiple hide-dropdown-icon
          input-debounce="0" @new-value="createValue" new-value-mode="add-unique" style="width: 250px"></q-select>

        <q-input v-model="form.endDate" filled mask="date" :rules="['date']">
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.endDate" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup :label="$q.lang.label.close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div>
          <q-btn label="Save" type="submit" color="primary" />
          <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar'
import useRightDrawer from 'src/stores/rightDrawer';
import usetaskListStore from 'src/stores/task';
import { v4 as uuidv4 } from 'uuid';


const rightDrawer = useRightDrawer();

const store = usetaskListStore();
const { payload } = storeToRefs(rightDrawer);

const $q = useQuasar()
const myFormRef = ref(null)
const dense = ref<boolean>(true)

const form = reactive({
  title: payload.value.title,
  tags: payload.value.tags,
  endDate: payload.value.endDate,
  id: payload.value.id
})
const rules = {
  title: [
    (val: string) => (val && val.length == 30) || 'Title must contain 30 chars',
  ]
}

function createValue(val, done) {
  if (!/[^a-zA-Z]/.test(val))
    done(val);
}

function onSubmit() {
  if (payload.value.id == null) {
    store.addtask({
      title: form.title,
      id: uuidv4(),
      endDate: form.endDate,
      description: "",
      state: false,
      tags: form.tags
    });
  }
  else {
    store.updateTask({
      id: form.id,
      title: form.title,
      endDate: form.endDate,
      state: true,
      tags: form.tags
    });
  }

  rightDrawer.close();

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Saved'
  })
}

function onReset() {
  rightDrawer.close();
}
</script>
<style lang="scss" scoped></style>
