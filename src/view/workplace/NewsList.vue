<template>
  <div class="news-list">
    <div class="news-item" v-for="item in dataSource" :key="item.id">
      <a-avatar
        shape="square"
        :style="{
          color: '#fff',
          backgroundColor: 'var(--avatar-bg)',
        }"
        :src="item.create_user.avatarUrl"
        :size="64"
      >
        {{ item.create_user.username }}
      </a-avatar>
      <div class="content">
        <h4>
          <div>
            <span class="username">{{ item.create_user.username }}</span>
            {{ operation[item.operation] }} [{{ type[item.type] }}]
            <a :title="item.data.title" @click="toDetail(item.data)">{{
              item.data.title
            }}</a>
          </div>
        </h4>
        <div class="time">{{ item.createTime }}</div>
      </div>
    </div>
    <div v-if="dataSource.length === 0" :style="{ margin: '15px 0' }">
      <a-empty description="暂无消息" />
    </div>
  </div>
  <a-pagination
    v-model:current="pagination.current"
    v-model:pageSize="pagination.pageSize"
    :total="pagination.total"
    :page-size-options="pageSizeOptions"
    show-size-changer
    @change="handleChangePagination"
    @showSizeChange="onShowSizeChange"
  />
</template>

<script lang="ts">
const operation = {
  create: "分配了",
  update: "更新了",
};
const type = {
  task: "任务",
  requirement: "需求",
  defect: "bug",
};

import {
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import { api } from "/@/http/api";
export default {
  setup() {
    const vm = getCurrentInstance();

    const dataSource = ref<Array<any>>([]);
    const pageSizeOptions: Array<string> = ["6", "10", "20", "30"];
    const pagination = reactive({
      current: 1,
      pageSize: 6,
      defaultPageSize: 6,
      total: 0,
    });

    onBeforeMount(() => {
      getNews();
    });

    const getNews = async () => {
      console.log(pagination);
      const newsRes = await api.workplace.getNews();
      pagination.total = newsRes.data.total;
      dataSource.value = newsRes.data.data;
    };

    const toDetail = (record) => {
      console.log(record);
    };

    const handleChangePagination = (page, pageSize) => {
      console.log(page, pageSize);
    };

    const onShowSizeChange = (current, size) => {
      console.log(current, size);
    };

    return {
      dataSource,
      pagination,
      toDetail,
      handleChangePagination,
      onShowSizeChange,
      pageSizeOptions,
      operation,
      type,
    };
  },
};
</script>

<style lang="scss" scoped>
.news-list {
  .news-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    align-items: center;

    border-bottom: 1px solid #e8e8e8;

    &:last-child {
      border-bottom: none;
    }
    .content {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      h4 {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 28px;
        div {
          .username {
            color: var(--title-color);
          }
        }
      }

      .time {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
}
</style>
