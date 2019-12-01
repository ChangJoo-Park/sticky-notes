<template>
  <div class="flex flex-col mb-4 items-stretch bg-white">
    <div class="flex border-b mb-4 items-center">
      <div class="drag cursor-move mr-4">::</div>
      <div
        class="text-2xl cursor-pointer mr-4"
        contenteditable="true"
      >{{section.name}} / {{section.id}}</div>
      <div>
        <button @click="addItem(section.id)">New Item</button>
      </div>
    </div>
    <draggable
      v-model="section.items"
      handle=".drag"
      @start="drag=true"
      @end="drag=false"
      @change="changeItemPosition"
      animation="300"
      class="bg-white flex items-start"
    >
      <div
        v-for="(item, itemIndex) in section.items"
        :key="itemIndex"
        class="item bg-white rounded p-2 mr-4 mb-4 inline-block w-full lg:w-64 sm:w-full shadow"
      >
        <div class="drag h-4 cursor-move"></div>
        <!-- Blocks -->
        <div class="p-2 mb-1">
          <template v-for="(block, blockIndex) in item.blocks">
            <textarea
              v-if="block.type === 'heading'"
              :key="blockIndex"
              rows="1"
              class="resize-none w-full font-bold text-xl p-2 hover:bg-gray-100 focus:bg-gray-300 outline-none hover:shadow-outline"
              placeholder="Heading"
              v-model="block.value"
              @keyup="updateItemBlock(section.id, itemIndex, blockIndex, block.value)"
            />
            <div
              v-if="block.type === 'text'"
              :key="blockIndex"
              type="text"
              class="w-full px-2 py-1 hover:bg-gray-300 focus:bg-gray-100 mb-1 outline-none focus:rounded hover:rounded focus:shadow-outline hover:shadow-outline"
              placeholder="Write Here..."
              contenteditable="true"
              spellcheck="false"
              @keyup="updateItemBlock(section.id, itemIndex, blockIndex, block.value, $event)"
              v-html="block.value"
            />
          </template>
        </div>
        <div class="drag tools px-2 cursor-move flex invisible">
          <div class="flex-1 flex items-center">
            <button
              class="font-bold mr-2"
              @click="addNewBlockToItem (section.id, itemIndex, null, 'heading')"
            >H</button>
            <button
              class="font-bold mr-2"
              @click="addNewBlockToItem (section.id, itemIndex, null, 'text')"
            >T</button>
          </div>
          <div class>
            <button @click="removeItem(section.id, index)">
              <img src="@/assets/icon/x.svg" width="16px" alt />
            </button>&nbsp;
            <button>
              <img src="@/assets/icon/more-horizontal.svg" width="16px" alt />
            </button>&nbsp;
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { db } from "@/db";
import debounce from "vue-debounce/dist/debounce.min.js";
import VanillaCaret from "vanilla-caret-js"

export default {
  props: {
    section: {
      type: Object
    }
  },
  components: {
    draggable
  },
  methods: {
    async addItem(sectionId) {
      const sectionRef = db.collection("sections").doc(sectionId);
      const sectionSnapshot = await sectionRef.get();
      const sectionData = sectionSnapshot.data();
      const hasItems = sectionData.hasOwnProperty("items");

      if (!hasItems) {
        sectionData["items"] = [];
      }

      sectionData["items"].push({
        blocks: [{ type: "heading", value: "Hello World" }]
      });

      await sectionRef.set(sectionData, { merge: true });
    },
    async removeItem(sectionId, index) {
      const sectionRef = db.collection("sections").doc(sectionId);
      const sectionSnapshot = await sectionRef.get();
      const sectionData = sectionSnapshot.data();
      const hasItems = sectionData.hasOwnProperty("items");

      if (!hasItems) {
        sectionData["items"] = [];
      }
      sectionData["items"].splice(index, 1);
      await sectionRef.set(sectionData, { merge: true });
    },
    async changeItemPosition(event) {
      if (event.hasOwnProperty("moved")) {
        const { moved } = event;
        const { newIndex, oldIndex } = moved;
        const sectionRef = db.collection("sections").doc(this.section.id);
        const sectionSnapshot = await sectionRef.get();
        const sectionData = sectionSnapshot.data();
        const hasItems = sectionData.hasOwnProperty("items");

        if (!hasItems) {
          sectionData["items"] = [];
        }

        [sectionData["items"][newIndex], sectionData["items"][oldIndex]] = [
          sectionData["items"][oldIndex],
          sectionData["items"][newIndex]
        ];
        await sectionRef.set(sectionData, { merge: true });
      }
    },
    async updateItem() {},
    updateItemBlock: debounce(async function(
      sectionId,
      itemIndex,
      blockIndex,
      value,
      event
    ) {
      const sectionRef = db.collection("sections").doc(sectionId);
      const sectionSnapshot = await sectionRef.get();
      const sectionData = sectionSnapshot.data();
      const hasItems = sectionData.hasOwnProperty("items");

      if (!hasItems) {
        sectionData["items"] = [];
      }
      let caret = null;
      let caretPos = -1;
      if (event) {
        sectionData.items[itemIndex].blocks[blockIndex].value =
          event.target.innerHTML;
        caret = new VanillaCaret(event.target); // Initialize
        caretPos = caret.getPos()
      } else {
        sectionData.items[itemIndex].blocks[blockIndex].value = value;
      }
      await sectionRef.set(sectionData, { merge: true });
      if (event && document.activeElement === event.target && caretPos > 0) {
        console.log('caret reset')
        caret.setPos(caretPos);
      }
    },
    400),
    async addNewBlockToItem(sectionId, itemIndex, blockIndex, blockType) {
      const sectionRef = db.collection("sections").doc(sectionId);
      const sectionSnapshot = await sectionRef.get();
      const sectionData = sectionSnapshot.data();
      const hasItems = sectionData.hasOwnProperty("items");
      if (!hasItems) {
        sectionData["items"] = [];
      }
      if (blockIndex === null) {
        sectionData.items[itemIndex].blocks.push({
          type: blockType,
          value: ""
        });
      }
      await sectionRef.set(sectionData, { merge: true });
    }
  }
};
</script>

<style>
.item {
  min-height: 100px;
}
.item:hover .tools {
  visibility: visible;
}
</style>