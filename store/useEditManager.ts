import { defineStore } from 'pinia';

export const useEditManager = defineStore('editManager', {
  state: () => ({
    editId: null
  }) as { editId: string | null },
  actions: {
    setEditId(editId: string) {
      this.editId = editId
    }
  },
  getters: {
    isEditing: (state) => state.editId !== null,
    getEditId: (state) => state.editId
  }
})