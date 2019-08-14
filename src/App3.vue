<template>
  <div id="app">
    <quill-editor ref="editor" :options="editorOption"></quill-editor>
  </div>
</template>

<script>
/* eslint-disable */
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
const toolbarOptions = [['bold', 'italic', 'underline', 'strike'], ['formula']];
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: 'Input the content here.',
        theme: 'snow',
        modules: {
          formula: true,
          toolbar: toolbarOptions
        }
      }
    };
  },
  mounted() {
    this.initFoumlaEvent();
  },
  methods: {
    initFoumlaEvent() {
      this.$refs.editor.quill
        .getModule('toolbar')
        .addHandler('formula', this.formulaHandler);
    },
    formulaHandler() {
      console.log('111111111');
    }
  }
};
</script>

<style lang="scss">
.quill-editor {
  height: 300px;
}
</style>
