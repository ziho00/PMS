<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="工作台"
    :breadcrumb="{ routes }"
  >
    <div class="content">
      <div class="main">
        <div class="main-content">
          <div class="avatar">
            <a-avatar
              :size="72"
              :src="userInfo.avatar"
              :style="{ color: '#fff', backgroundColor: '#69c0ff' }"
              >{{ userInfo.username }}
            </a-avatar>
          </div>
          <div class="content">
            <div class="content-title">
              {{ timeZone }}好，{{ userInfo.username }}
            </div>
            <div>研发人员</div>
          </div>
        </div>
      </div>
      <div class="extra">
        <div class="extra-content">
          <div class="stat-item">
            <a-statistic title="项目数" :value="6" />
          </div>
          <div class="stat-item">
            <a-statistic title="完成任务" :value="350" />
          </div>
          <div class="stat-item">
            <a-statistic title="修复缺陷" :value="888" />
          </div>
        </div>
      </div>
    </div>
  </a-page-header>
  <div class="page-content">
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          style="margin-bottom: 24px"
          :bordered="false"
          title="我的项目"
          :body-style="{ padding: 0 }"
        >
          <template #extra>
            <a href="#" @click="toProjectPage">全部项目</a>
          </template>
          <div>
            <a-card-grid :key="i" v-for="(item, i) in projects">
              <a-card :bordered="false">
                <a-card-meta
                  :description="
                    item.desc.length > 24
                      ? item.desc.slice(0, 24) + '...'
                      : item.desc
                  "
                >
                  <template #title>
                    <a-avatar :size="24" :src="item.picUrl">{{
                      item.name
                    }}</a-avatar>
                    <a
                      class="project-name"
                      href="#"
                      @click="toProjectDetail(item)"
                      >{{ item.name }}
                    </a>
                  </template>
                </a-card-meta>
              </a-card>
            </a-card-grid>
          </div>
        </a-card>

        <a-card
          :tab-list="workplaceTabs"
          :active-tab-key="activeTabKey"
          @tabChange="changeTab"
        >
        </a-card>
      </a-col>
      <a-col
        style="padding: 0 12px"
        :xl="8"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24"
      >
        <a-card title="工作指数" :bordered="false" :body-style="{ padding: 0 }">
          xxx
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { getTimeZone } from "/@/utils";

const routes = [
  {
    path: "/",
    breadcrumbName: "主页",
  },
  {
    path: "/workplace",
    breadcrumbName: "工作台",
  },
];

const workplaceTabs = [
  {
    tab: "我的待办",
    key: "my_todo",
  },
  {
    key: "my_done",
    tab: "我的已办",
  },
  {
    key: "my_created",
    tab: "我的创建",
  },
];

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const timeZone = getTimeZone();
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const activeTabKey = ref<string>("my_todo");
    const projects = ref<any[]>([
      {
        picUrl:
          "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
        name: "项目名",
        desc: "项目描述项目描述项目描述项目描述项目描述项目描述",
      },
      {
        picUrl:
          "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
        name: "项目名",
        desc: "项目描述项目描述项目描述项目描述项目描述项目描述项目描述",
      },
      {
        picUrl:
          "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
        name: "项目名",
        desc: "项目描述项目描述项目描述项目描述项目描述项目描述项目描述",
      },
      {
        picUrl:
          "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
        name: "项目名",
        desc: "项目描述项目描述项目描述项目描述项目描述项目描述项目描述",
      },
    ]);

    const toProjectPage = () => {
      router.push("/project");
    };

    const toProjectDetail = (project) => {
      console.log(project);
    };

    const changeTab = (key: string) => {
      activeTabKey.value = key;
    };

    return {
      timeZone,
      userInfo,
      changeTab,
      routes,
      workplaceTabs,
      activeTabKey,
      toProjectPage,
      projects,
      toProjectDetail,
    };
  },
};
</script>

<style lang="scss">
.content {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  .main {
    flex: auto;
    &-content {
      display: flex;
      .avatar {
        flex: 0 1 72px;
        & > span {
          display: block;
          width: 72px;
          height: 72px;
          border-radius: 72px;
        }
      }
      .content {
        position: relative;
        display: flex;
        flex-direction: column;
        top: 4px;
        margin-left: 24px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;

        .content-title {
          margin-bottom: 12px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
        }
      }
    }
  }
  .extra {
    flex: 0 1 auto;
    min-width: 240px;
    margin-left: 88px;
    text-align: right;
    .extra-content {
      zoom: 1;
      float: right;
      white-space: nowrap;
      .stat-item {
        position: relative;
        display: inline-block;
        padding: 0 32px;

        &::after {
          position: absolute;
          top: 8px;
          right: 0;
          width: 1px;
          height: 40px;
          background-color: #e8e8e8;
          content: "";
        }

        &:last-child {
          padding-right: 0;

          &::after {
            display: none;
          }
        }
      }
    }
  }
}
.page-content {
  margin: 24px 24px 0;
}
.ant-card-body {
  padding: 0;
}
.ant-card-meta-title {
  .project-name {
    color: #555;
    margin-left: 8px;
    font-size: 14px;
    &:hover {
      color: rgb(24, 144, 255);
    }
  }
}
</style>
