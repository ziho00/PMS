<template>
  <div>
    <div class="comment">
      <div class="header">
        {{
          form && to
            ? `${username} 从 [${from}] 流转至 [${to}] 的评论：`
            : `${username}的评论：`
        }}
        <div class="icons">
          <FormOutlined class="pointer" @click="handleEditComment" />
          <a-popconfirm
            title="确认删除该评论?"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDeleteComment"
          >
            <DeleteOutlined class="pointer" />
          </a-popconfirm>
        </div>
      </div>
      <div class="container" v-html="comment"></div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<script>
import { FormOutlined, DeleteOutlined } from "@ant-design/icons-vue";

export default {
  name: "Comment",
  props: {
    from: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "--",
    },
    comment: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "--",
    },
  },
  components: {
    FormOutlined,
    DeleteOutlined,
  },
  setup(props, ctx) {
    const handleEditComment = () => {
      ctx.emit("onEdit");
    };

    const handleDeleteComment = () => {
      ctx.emit("onDelete");
    };
    return {
      handleEditComment,
      handleDeleteComment,
    };
  },
};
</script>

<style lang="scss">
.comment {
  margin-top: 15px;
  display: inline-block;
  padding: 10px;
  min-width: 350px;
  background: #f5f5f5;
  border-radius: 3px;

  .header {
    position: relative;
    .icons {
      display: inline-block;
      position: absolute;
      right: 0;
      span {
        transition: all 0.3s;
        opacity: 0;
        margin-left: 8px;
      }
    }
  }

  .container {
    margin-top: 10px;
    max-width: 450px;
  }

  .time {
    margin-top: 8px;
    color: #8c8c8c;
    font-size: 12px;
  }
  &:hover {
    .header {
      .icons {
        span {
          opacity: 1;
        }
      }
    }
  }
}
</style>
