<template>
  <div class="grid-sections p-2">
    <template v-for="section in sections">
      <div class="item bg-white" :key="section.id">
        <div class="item-content hover:border-black">
        <!-- Safe zone, enter your custom markup -->
          <div class="flex border-b mb-4 items-center">
            <div class="drag cursor-move mr-2">=</div>
            <div class="flex-1 text-2xl cursor-pointer">
              <input type="text" v-model="section.name" class="font-bold">
            </div>
          </div>
          <div v-if="showInnerSection">
            <!-- ITEMS -->
            <inner-section :section-id="section.id" @update-layout="updateLayout" />
          </div>
        <!-- Safe zone ends -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Muuri from 'muuri'

import InnerSection from '@/components/app/InnerSection'

export default {
  components: {
    InnerSection
  },
  data () {
    return {
      grid: null,
      showInnerSection: true,
      sections: [
        {
          id: '1234',
          name: 'HELLO WORLD',
          note: []
        },
        {
          id: '456',
          name: 'New Section',
          note: []
        },
        {
          id: '789',
          name: 'HHHHH',
          note: []
        },
        {
          id: '987',
          name: '안녕하세요',
          note: []
        }
      ]
    }
  },
  mounted () {
    this.grid = new Muuri('.grid-sections', {
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
        handle: '.drag'
      },
      dragAxis: 'y',
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
    updateLayout () {
      this.grid.refreshItems().layout()
    }
  }
}
</script>

<style lang="scss">
.grid-sections {
  position: relative;
  & > .item {
    display: block;
    position: absolute;
    width: 100%;
    // min-height: 300px;
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