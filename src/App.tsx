import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { routes, fallbackRoute } from './router';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);

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
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={165}>
          <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
            <Suspense fallback={<p>loading</p>}>
              <Routes>
                {routes.map((route) => {
                  if (route.children) {
                    return route.children.map((child) => {
                      return <Route
                        key={child.path}
                        path={child.path}
                        element={<child.component />}
                      />
                    })
                  }
                  return <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                    {...(route.exact ? { index: true } : {})}
                  />
                })}
                {/* 兜底路由 */}
                <Route
                  path={fallbackRoute.path}
                  element={<fallbackRoute.component />}
                />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;