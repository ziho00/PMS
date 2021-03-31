<template>
  <div class="editor" :id="`editor-${id}`"></div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import Editor from "wangeditor";

let id = 0;
export default {
  name: "RichTextEditor",
  props: {
    value: String,
    focus: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: Number,
      default: 500,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const editor = ref<object>(null);
    const content = ref<string>(null);
    id = id + 1;

    onMounted(() => {
      init();
    });

    watch(
      () => props.value,
      (newVal) => {
        const _editor: any = editor.value;
        if (_editor) {
          if (newVal && newVal !== content.value) {
            content.value = newVal;
            _editor.txt.html(newVal);
          } else if (!newVal) {
            _editor.txt.html("");
          }
        }
      }
    );

    const init = () => {
      const { options, value, focus } = props;
      const _editor = new Editor(`#editor-${id}`);
      _editor.config.focus = focus;
      _editor.config.placeholder =
        (options && options.placeholder) || "请输入内容...";
      _editor.config.height = props.height;

      _editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "todo",
        "justify",
        "quote",
        "emoticon",
        // "image",
        // "video",
        "table",
        "code",
        "splitLine",
        "undo",
        "redo",
      ];
      _editor.config.onchange = (newHtml) => {
        content.value = newHtml;
      };

      _editor.create();

      if (value) {
        _editor.txt.html(value);
      }

      editor.value = _editor;
    };

    return {
      id,
      editor,
      content,
    };
  },
};
</script>

<style lang="scss">
.editor {
  div {
    border: none !important;
  }
  .w-e-toolbar {
    border-bottom: 1px solid var(--border-color) !important;
  }
}
</style>
