import { lazy } from "react";
import { HomeOutlined, InfoCircleOutlined, ToolOutlined } from "@ant-design/icons"; // 引入图标

// 路由配置数组
export const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
    exact: true,
    icon: HomeOutlined,
    title: "首页",
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/About")),
    icon: InfoCircleOutlined,
    title: "关于",
  },
  {
    path: "/utilTools",
    icon: ToolOutlined,
    title: "工具",
    children: [
      {
        path: "/utilTools/uploadFile",
        component: lazy(() => import("./pages/UploadFile")),
        title: "文件上传",
      },
    ],
  },
];

// 导出兜底路由
export const fallbackRoute = {
  path: "*",
  component: lazy(() => import("./pages/NotFound/NotFound")),
};
