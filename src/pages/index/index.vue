<template>
  <div>
    <el-container>
      <el-aside width="240px">
        <!-- 侧边栏 -->
        <el-menu
          router
          default-active="/index"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 首页 -->
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 系统设置 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/manger">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 商城设置 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/cate">商品分类</el-menu-item>
              <el-menu-item index="/index/spces">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/member">会员管理</el-menu-item>
              <el-menu-item index="/index/loop">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 商城设置 -->
          <!-- <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">商城设置</span>
            </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>

        <el-header>Header</el-header>

        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  height: 100vh;
  background-color: #20222a;
}
</style>