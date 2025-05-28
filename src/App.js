import React, { Suspense } from "react";
import "./App.css";

// Lazy load the Home component
const Home = React.lazy(() => import("./controllers/Home/component"));

function App() {
  return (
    <div className="App">
      {/* Suspense for lazy-loaded components with a fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
