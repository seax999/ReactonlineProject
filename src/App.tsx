import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes, fallbackRoute } from './routers/router';
import Loading from './pages/Loading/index';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Suspense fallback={<Loading />}>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                  {...(route.exact ? { index: true } : {})}
                />
              ))}
              {/* 兜底路由 */}
              <Route
                path={fallbackRoute.path}
                element={<fallbackRoute.component />}
              />
            </Routes>
          </Suspense>
        </header>
      </div>
    </Router>
  );
}

export default App;