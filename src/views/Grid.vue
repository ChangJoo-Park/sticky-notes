<template>
  <div class="grid">

    <div class="item">
      <div class="item-content">
      <!-- Safe zone, enter your custom markup -->
      This sscan be anything.
      <!-- Safe zone ends -->
      </div>
    </div>

    <div class="item">
      <div class="item-content">
      <!-- Safe zone, enter your custom markup -->
      <div class="my-custom-content">
        Yippdee!
      </div>
      <!-- Safe zone ends -->
      </div>
    </div>
    <div class="item">
      <div class="item-content">
      <!-- Safe zone, enter your custom markup -->
      <div class="my-custom-content">
        Yippee!
      </div>
      <!-- Safe zone ends -->
      </div>
    </div>
    <div class="item">
      <div class="item-content">
      <!-- Safe zone, enter your custom markup -->
      <div class="my-custom-content">
        Yippee!
      </div>
      <!-- Safe zone ends -->
      </div>
    </div>

  </div>
</template>

<script>
import Muuri from 'muuri'

export default {
  mounted () {
    var grid = new Muuri('.grid', {
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
        handle: false
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
      dragReleaseEasing: 'ease',
      dragCssProps: {
        touchAction: 'none',
        userSelect: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0, 0, 0, 0)',
        touchCallout: 'none',
        contentZooming: 'none'
      },
      dragPlaceholder: {
        enabled: false,
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

<style>
.grid {
  position: relative;
}
.item {
  display: block;
  position: absolute;
  width: 300px;
  height: 300px;
  margin: 5px;
  z-index: 1;
  background: #000;
  color: #fff;
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
</style>