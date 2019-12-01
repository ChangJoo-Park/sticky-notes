export default {
  template: `<div contenteditable="true" v-once v-html="value" :value="value" @input="$emit('input', $event.target.innerHTML)"></div>`,
  props: ['value'],
  watch: {
    value: function (newValue) {
      if (document.activeElement == this.$el) {
        return;
      }

      this.$el.innerHTML = newValue;
    }
  },
  name: 'editable'
}
