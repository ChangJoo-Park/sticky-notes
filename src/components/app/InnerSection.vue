<template>
  <div class="items p-2" :class="`items-${sectionId}`">
    <template v-for="item in items">
      <div class="item border rounded mx-2 bg-white"  :key="item.id">
        <div class="item-content">
        <!-- Safe zone, enter your custom markup -->
          <div class="h-full flex flex-col">
            <div class="drag-item h-4 cursor-move"></div>
            <div class="flex-1">
              <div v-for="(block, index) in item.blocks" :key="index" class="focus:bg-gray-100 active:bg-gray-100 px-2">
                <template v-if="block.type === 'heading'">
                  <textarea v-model="block.value" rows=1 class="font-bold text-xl resize-none w-full" />
                </template>
                <template v-if="block.type === 'note'">
                  <div
                    contenteditable="true"
                    class="hover:bg-gray-100"
                  >
                    {{block.value}}
                  </div>
                </template>
              </div>
            </div>
            <div class="p-2 drag-item h-8 cursor-move flex">
              <button @click="addBlock(item.id)"> + </button>
              <button> - </button>
            </div>
          </div>
        <!-- Safe zone ends -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Muuri from 'muuri'

export default {
  props: {
    sectionId: {
      type: String
    }
  },
  data () {
    return {
      grid: null,
      items: [
        {
          id: 111,
          blocks: [
            {
              type: 'heading',
              value: 'HELLO WORLD'
            },
            {
              type: 'note',
              value: 'hello world'
            }
          ],
          name: "HELLO2222 WORLD"
        },
        {
          id: 2222,
          blocks: [
            {
              type: 'heading',
              value: 'HELLO WORLD'
            },
            {
              type: 'note',
              value: 'hello world'
            }
          ],
        }
      ]
    }
  },
  mounted () {
    this.grid = new Muuri(`.items-${this.sectionId}`, {
      // Item elements
      items: '*',

      // Default show animation
      showDuration: 300,
      showEasing: 'ease',

      // Default hide animation
      hideDuration: 300,
      hideEasing: 'ease',

      // Item's visible/hidden state styles
      visibleStyles: {
        opacity: '1',
        transform: 'scale(1)'
      },
      hiddenStyles: {
        opacity: '0',
        transform: 'scale(0.5)'
      },

      // Layout
      layout: {
        fillGaps: false,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: true
      },
      layoutOnResize: 100,
      layoutOnInit: true,
      layoutDuration: 300,
      layoutEasing: 'ease',

      // Sorting
      sortData: null,

      // Drag & Drop
      dragEnabled: true,
      dragContainer: null,
      dragStartPredicate: {
        distance: 0,
        delay: 0,
        handle: '.drag-item'
      },
      dragAxis: null,
      dragSort: true,
      dragSortHeuristics: {
        sortInterval: 100,
        minDragDistance: 10,
        minBounceBackAngle: 1
      },
      dragSortPredicate: {
        threshold: 50,
        // action: actionMove
      },
      dragReleaseDuration: 300,
      dragReleaseEasing: 'ease-in-out',
      dragCssProps: {
        touchAction: 'none',
        userSelect: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0, 0, 0, 0)',
        touchCallout: 'none',
        contentZooming: 'none'
      },
      dragPlaceholder: {
        enabled: true,
        duration: 300,
        easing: 'ease',
        createElement: null,
        onCreate: null,
        onRemove: null
      },

      // Classnames
      containerClass: 'muuri',
      itemClass: 'muuri-item',
      itemVisibleClass: 'muuri-item-shown',
      itemHiddenClass: 'muuri-item-hidden',
      itemPositioningClass: 'muuri-item-positioning',
      itemDraggingClass: 'muuri-item-dragging',
      itemReleasingClass: 'muuri-item-releasing',
      itemPlaceholderClass: 'muuri-item-placeholder'
    })
  },
  methods: {
    addBlock (id) {
      const itemIndex = this.items.findIndex(item => item.id === id)
      this.items[itemIndex].blocks.push({
        type: 'note',
        value: 'hello world'
      })
      this.grid.refreshItems().layout();
      this.$emit('update-layout')
    }
  }
}
</script>

<style lang="scss">
.items {
  position: relative;
  & > .item {
    display: inline-block;
    position: absolute;
    width: 250px;
    margin-bottom: 1rem;
    z-index: 1;
  }
  .item.muuri-item-dragging {
    z-index: 3;
  }
  .item.muuri-item-releasing {
    z-index: 2;
  }
  .item.muuri-item-hidden {
    z-index: 0;
  }
  .item-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>