import Creative from "./components/Creative";
import Filter from "./components/Filter";

function App() {
  return (
    <div className="w-full h-full flex p-5 overflow-hidde">
      <Filter />
      <Creative />
    </div>
  );
}

export default App;
