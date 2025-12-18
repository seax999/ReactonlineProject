import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes, fallbackRoute } from './router';
import { Layout } from 'antd';
import CommonLayout from './components/CommonLayout';
import './app.css';

const { Content } = Layout;
function App() {
  return (
    <Router>
      <Layout className='app_layout'>
        <CommonLayout />
        <Content className='app_content'>
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
    </Router>
  );
}

export default App;