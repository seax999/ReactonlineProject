// src/routers/router.ts
import { lazy } from "react";

// 使用懒加载导入组件
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

// 路由配置接口
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  exact?: boolean;
}

// 路由配置数组
export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
  },
];

// 导出兜底路由
export const fallbackRoute: RouteConfig = {
  path: "*",
  component: NotFound,
};
