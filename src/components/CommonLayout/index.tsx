import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

function CommonLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const items = routes.map(route => {
    if (route.children) {
      return {
        label: route.title,
        key: route.path,
        icon: <route.icon />,
        children: route.children.map(child => {
          return {
            label: <Link to={child.path}>{child.title}</Link>,
            key: child.path,
          }
        })
      }
    }
    return {
      label: <Link to={route.path}>{route.title}</Link>,
      key: route.path,
      icon: <route.icon />,
    }
  })

  // 获取当前应该选中的菜单项key
  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    const selectedKeys = [];

    // 查找匹配的路由
    for (const route of routes) {
      if (route.children) {
        for (const child of route.children) {
          if (currentPath === child.path) {
            selectedKeys.push(child.path);
            return selectedKeys;
          }
        }
      } else {
        // 精确匹配或前缀匹配
        if (currentPath === route.path ||
          (route.exact !== true && currentPath.startsWith(route.path))) {
          selectedKeys.push(route.path);
          return selectedKeys;
        }
      }
    }

    // 如果没有找到匹配项，默认第一个
    selectedKeys.push(items[0].key);
    return selectedKeys;
  };

  return (
    <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={165}>
      <Menu selectedKeys={getSelectedKeys()} mode="inline" items={items} />
    </Sider>
  );
}

export default CommonLayout;