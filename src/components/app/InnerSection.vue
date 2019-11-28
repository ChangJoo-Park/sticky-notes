<template>
  <div class="items p-2" :class="`items-${sectionId}`">
    <template v-for="item in items">
      <div class="item border"  :key="item.id">
        <div class="item-content">
        <!-- Safe zone, enter your custom markup -->
          <div class="cursor-pointer ">
            {{item.name}} - {{ sectionId }}
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
      items: [
        {
          id: 111,
          name: "HELLO2222 WORLD"
        },
        {
          id: 2222,
          name: "HELLO adsfasdfasd"
        }
      ]
    }
  },
  mounted () {
    var grid = new Muuri(`.items-${this.sectionId}`, {
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
        handle: null
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
  }
}
</script>

<style lang="scss">
.items {
  position: relative;
  & > .item {
    display: inline-block;
    position: absolute;
    width: 200px;
    height: 200px;
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