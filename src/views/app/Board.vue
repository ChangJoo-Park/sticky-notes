<template>
  <div>
    <form @submit.prevent="addSection">
      <input type="text" v-model="newSection">
    </form>
    <draggable
      v-model="sections"
      handle=".drag"
      direction="vertical"
      @start="drag=true"
      @end="drag=false"
      @change="updateSectionOrder"
      animation=300
    >
      <section-component v-for="section in sections" :key="section.id" :section="section" />
    </draggable>
  </div>
</template>

<script>
import { db } from '@/db'
import SectionComponent from '@/components/app/Section'
import draggable from 'vuedraggable'

export default {
  components: {
    SectionComponent,
    draggable
  },
  data () {
    return {
      grid: null,
      boardId: this.$route.params.id,
      board: null,
      sections: null,
      newSection: ''
    }
  },
  firestore() {
    return {
      board: db.collection('boards').doc(this.boardId),
      sections: db.collection('sections').where("boardId", "==", this.boardId).orderBy('order')
    }
  },
  methods: {
    addSection () {
      db.collection('sections').add({
        name: this.newSection,
        boardId: this.boardId
        // userRef: db.doc('users/' + firebase.auth().currentUser.uid)
      })
      this.newSection = ''
    },
    async updateSectionOrder ({ moved }) {
      console.log('moved -> ', moved)
      if (!moved) {
        return
      }

      const sectionsRef = await db.collection('sections').where("boardId", "==", this.boardId)
      const sectionsDocuments = await sectionsRef.get()
      const ids = this.sections.map(s => s.id)
      const batch = db.batch()

      ids.forEach((id, index) => {
        const doc = sectionsDocuments.docs.find(d => d.id === id)
        if (doc) {
          batch.update(doc.ref, { order: index })
        }
      });

      await batch.commit()
    }
  }
}
</script>

<style>
</style>