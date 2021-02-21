import React,{Suspense} from 'react'
import {renderRoutes} from 'react-router-config'
import {BrowserRouter} from 'react-router-dom'
import routes from './router'
function App() {
  return (
    <div className="App">
      <h2>Hello</h2>
      <BrowserRouter>
        <Suspense fallback={"loading"}>
          {renderRoutes(routes)}
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
