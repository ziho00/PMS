<template>
  <div :id="`quill-${id}`" ref="editor"></div>
</template>

<script lang="ts">
import { ref, onMounted, getCurrentInstance, watch } from "vue";

let id = 0;
const defaultOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link"],
    ],
  },
  placeholder: "Insert text here ...",
};
export default {
  name: "RichTextEditor",
  props: {
    value: String,
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const { value, options } = props;
    id = id + 1;
    const vm = getCurrentInstance();
    const editor = ref<object>(null);
    const content = ref<string>("");
    const _options = ref<object>(Object.assign({}, defaultOptions, options));

    watch(
      () => props.value,
      (newVal) => {
        const quill: any = editor.value;
        if (quill) {
          if (newVal && newVal !== content.value) {
            content.value = newVal;
            quill.pasteHTML(newVal);
          } else if (!newVal) {
            quill.setText("");
          }
        }
      }
    );

    onMounted(() => {
      init();
    });

    const init = () => {
      const quill = new Quill(`#quill-${id}`, _options.value);

      if (value) {
        quill.pasteHTML(value);
      }

      quill.on("text-change", () => {
        let html = (vm.refs.editor as HTMLElement).children[0].innerHTML;
        const text = quill.getText();
        if (html === "<p><br></p>") html = "";
        content.value = html;
        ctx.emit("update:value", content.value);
        ctx.emit("change", { html, text, quill });
      });

      editor.value = quill;
    };

    return {
      id,
      content,
      editor,
      _options,
    };
  },
};
</script>

<style></style>
