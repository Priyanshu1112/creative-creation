import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddCreativeOpen } from "../store/reducers/appReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const { colors, creative, isAddCreativeOpen } = useSelector(
    (state) => state.app
  );
  const [activeColor, setActiveColor] = useState(null);
  const [renderCreative, setRenderCreative] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let filteredCreative = creative;

    console.log({ activeColor, search });

    // Filter according to both active and search
    if (activeColor != null && search) {
      filteredCreative = creative.filter(
        (item) =>
          (item.color === colors[activeColor] && item.title.includes(search)) ||
          item.subtitle.includes(search)
      );
      console.log({ both: filteredCreative });
    }
    // Filter according to only activeColor
    else if (activeColor && !search) {
      filteredCreative = creative.filter(
        (item) => item.color === colors[activeColor]
      );
    }
    // Filter according to only search
    else if (!activeColor && search) {
      filteredCreative = creative.filter(
        (item) => item.title.includes(search) || item.subtitle.includes(search)
      );
    }

    // Update renderCreative with the filtered results
    setRenderCreative(filteredCreative);
  }, [activeColor, creative, search]);

  return (
    <div className="flex-1 flex flex-col md:block md:flex-[.65] h-full overflow-hidden pr-5">
      <h1 className="text-xl mb-5">Filter By:</h1>
      <div className="flex w-full gap-5 md:gap-16">
        <div>
          <p className="mb-4">color</p>
          <div className="grid grid-cols-4 gap-x-2 md:gap-x-4 gap-y-2">
            {colors?.map((color, index) => {
              return (
                <div
                  key={index}
                  className={`border ${
                    activeColor == index && "border-gray-900"
                  } rounded-full p-1`}
                >
                  <div
                    onClick={() => {
                      setActiveColor(index);
                    }}
                    style={{ backgroundColor: color }}
                    className={`w-[1.2rem] h-[1.2rem] cursor-pointer rounded-full border border-black`}
                  ></div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              setActiveColor(null);
            }}
            disabled={activeColor == null ? true : false}
            className="text-xs px-3 py-1 border border-slate-800 rounded-md mt-3 disabled:border-slate-400 disabled:text-slate-400"
          >
            Reset Color
          </button>
        </div>
        <div>
          <p className="mb-4">title/subtitle</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search across title and subtitle"
            name=""
            id=""
            className="p-2 text-xs md:text-sm w-[40vw] md:w-[20vw] outline-slate-600 border border-slate-500 rounded-md"
          />
        </div>
      </div>

      <div className=" w-full  flex items-center gap-10 mt-5">
        <div className="w-[30vw] md:w-[25vw] h-[1vmax] border-2 border-slate-700 rounded-md p-[1px]">
          <div
            style={{ width: `${(creative.length / 5) * 100}%` }}
            className={` h-full bg-black rounded-md`}
          ></div>
        </div>
        <p>{creative?.length}/5 Creatives</p>
      </div>

      <button
        onClick={() => {
          dispatch(toggleAddCreativeOpen());
        }}
        disabled={!isAddCreativeOpen && creative.length < 5 ? false : true}
        className="px-5 py-1 border text-xs border-slate-800 rounded-md mt-3 disabled:border-slate-400 disabled:text-slate-400"
      >
        + Add Creative
      </button>

      {/* All Creatives */}
      <div id="custom-scrollbar" className="h-[60%] mt-5 pt-3">
        {renderCreative?.map((creative, index) => {
          return (
            <div
              key={index}
              style={{ background: creative.color }}
              className="p-5 w-[40%] border-[3px] border-slate-800 rounded-md mb-5"
            >
              <h1>{creative.title}</h1>
              <p>{creative.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
