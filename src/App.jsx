import Creative from "./components/Creative";
import Filter from "./components/Filter";

function App() {
  return (
    <div className="w-full h-full md:flex relative p-5 overflow-hidden">
      <Filter />
      <Creative />
    </div>
  );
}

export default App;
