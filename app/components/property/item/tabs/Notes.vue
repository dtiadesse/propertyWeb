<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <div class="notes-container slds-p-around_x-small">

        <div class="slds-grid slds-wrap slds-grid_vertical-align-center">
          <div class="slds-col slds-size_8-of-12">
            <h1 class="title">Notes ({{ propertyStore.property.notes.length }})</h1>
          </div>
          <div class="slds-col slds-size_4-of-12" style="text-align: right;"> <button
              class="slds-button slds-button_neutral" @click="addNewNote">Add New Note</button>
          </div>

          <UiItemModal :is-visible="globalState.modalName === 'Add_Note'" @close="globalState.closeModal">
            <template #header>
              <template v-if="!noteModel.edit">Add New Note</template>
              <template v-else>Edit Note</template>
            </template>
            <div class="slds-grid slds-wrap" style="width: 85%;margin: 0 auto;">
              <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
                <div class="slds-form-element">
                  <label class="slds-form-element__label" for="text-input-id-20">Property</label>
                  <div class="slds-form-element__control">
                    <input type="text" id="text-input-id-20" readonly="true" placeholder="" class="slds-input"
                      :value="propertyStore.property.name" />
                  </div>
                </div>
              </div>
              <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
                <div class="slds-form-element" style="width: 65%;">
                  <label class="slds-form-element__label" for="text-input-id-2">
                    <abbr class="slds-required" title="required">* </abbr>Subject</label>
                  <div class="slds-form-element__control">
                    <input type="text" id="subject" placeholder="What’s the subject of the note?" required="true"
                      v-model="noteModel.subject" class="slds-input" />
                  </div>
                </div>
              </div>
              <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
                <div class="slds-form-element">
                  <label class="slds-form-element__label" for="text-input-id-2">
                    <abbr class="slds-required" title="required">* </abbr>Message/Note</label>
                  <div class="slds-form-element__control">
                    <textarea aria-re id="text-area-id" class="text-area slds-input" placeholder="" autocomplete="off"
                      v-model="noteModel.message" aria-autocomplete="none" autocorrect="off" autocapitalize="off"
                      spellcheck="false"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <template #footer>
              <button class="slds-button slds-button_neutral" @click="globalState.closeModal"
                aria-label="Cancel and close">Cancel</button>
              <button class="slds-button slds-button_brand" @click="saveNote">
                <template v-if="!noteModel.edit">Add Note</template>
                <template v-else>Update Note</template>
              </button>
            </template>
          </UiItemModal>
          <div class="slds-col slds-size_12-of-12">
            <div v-for="note in propertyStore.property.notes" class="slds-box">
              <div class="slds-grid slds-wrap">
                <div class="slds-col slds-size_9-of-12" style="align-content: center; align-self: center;">
                  Created by
                  <span class="created-by"> {{ note.createdBy }},</span>

                  {{ new Date(note.createdOn!).toLocaleDateString('en-US') }}
                </div>
                <div class="slds-col slds-size_3-of-12" style="text-align: right;">
                  <div class="slds-button-group" role="group">
                    <button class="slds-button slds-button_neutral" @click="editNote(note)">Edit</button>
                    <button class="slds-button slds-button_text-destructive"
                      @click="propertyStore.deleteNote(note.id)">Delete</button>
                  </div>
                </div>
                <div class="slds-col slds-size_12-of-12 subject-box">{{ note.subject }}</div>

                <div class="slds-box" style="width: 100%;border: 0;margin-top: 0.45rem;">
                  <p class="note-details">{{ note.message }}</p>
                </div>
              </div>
            </div>

            <div class="slds-box no-records" v-if="!propertyStore.property.notes.length">
              No records found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
const globalState = useMyGlobalStateStore();
const noteModel = ref({ subject: "", message: "", edit: false })

const addNewNote = () => {
  noteModel.value = { subject: "", message: "", edit: false };
  globalState.openModal('Add_Note');

}

const saveNote = () => {
  propertyStore.addNote(noteModel.value);
  noteModel.value = { subject: "", message: "", edit: false }
  globalState.closeModal()
}

const editNote = (note: any) => {
  noteModel.value = { ...note, edit: true };
  propertyStore.addNote(noteModel.value);
  globalState.openModal('Add_Note');
}

</script>

<style scoped>
.notes-container {
  background: #f3f3f3;
  padding: 0.85rem;
}

.title {
  font-size: 14px;
  font-weight: 700;
  text-align: left;

}

.slds-box {
  background: white;
  margin-top: 1rem;
}

.subject-box {
  background: #EAF5FE;
  margin-top: 1rem;
  padding: 0.5rem 0.75rem;
}

.text-area {
  height: 6.5rem;
  width: 85%;
  resize: none;
  line-height: 1.25rem;
}

.created-by {
  color: var(--primary-color);
}

.no-records {
  width: 100%;
  margin-bottom: 0;
}

.note-details {
  white-space: pre-wrap;
}
</style>