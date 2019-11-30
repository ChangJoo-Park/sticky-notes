<template>
  <div class="flex flex-col mb-4 items-stretch">
    <div class="flex border-b mb-4 items-center">
      <div class="drag cursor-move mr-4">::</div>
      <div class="text-2xl cursor-pointer mr-4" contenteditable="true">{{section.name}}</div>
      <div><button>New Item</button></div>
    </div>
    <draggable
      v-model="items"
      handle=".drag"
      @start="drag=true"
      @end="drag=false"
      animation=300
    >
      <div
        v-for="item in items"
        :key="item"
        class="item border rounded p-2 mr-4 mb-4 inline-block w-full lg:w-64 sm:w-full"
      >
        <div class="drag h-4 cursor-move"></div>
        <!-- Blocks -->
        <div class="p-2">
          <textarea rows="1" class="resize-none w-full font-bold text-xl p-2 hover:bg-gray-300 focus:bg-gray-300 outline-none hover:shadow-outline" placeholder="Heading" />
          <input type="text" class="w-full px-2 py-1 hover:bg-gray-300 focus:bg-gray-300 mb-1 outline-none focus:rounded hover:rounded focus:shadow-outline hover:shadow-outline" placeholder="Write Here...">
        </div>
        <div class="drag tools px-2 cursor-move flex invisible">
          <div class="flex-1 flex items-center">
            <button class="font-bold mr-2">H</button>
            <button><img src="@/assets/icon/edit-3.svg" width="16px" alt=""></button>
          </div>
          <div class="">
            <button><img src="@/assets/icon/more-horizontal.svg" width="16px" alt=""></button>&nbsp;
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    section: {
      type: Object
    }
  },
  components: {
    draggable
  },
  data () {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
</script>

<style>
.item {
  min-height: 100px;
}
.item:hover .tools {
  visibility: visible;
}
</style>