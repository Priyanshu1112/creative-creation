import { useDispatch, useSelector } from "react-redux";
import {
  addCreative,
  toggleAddCreativeOpen,
} from "../store/reducers/appReducer";
import { useState } from "react";

const Creative = () => {
  const dispatch = useDispatch();

  const { colors, isAddCreativeOpen } = useSelector((state) => state.app);
  const [activeColor, setActiveColor] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  return (
    <div
      className={`${
        isAddCreativeOpen ? "top-0 translate-x-0" : "top-0 translate-x-[110%]"
      }  md:flex-[.35] border-s-2 bg-white w-screen h-screen py-5 md:py-0 border-slate-700 transition-all px-5 md:relative absolute`}
    >
      <div className=" flex justify-between w-[90%] mx-auto">
        <h1 className="text-xl">Creative Creation</h1>
        <span
          onClick={() => {
            dispatch(toggleAddCreativeOpen());
          }}
          className="cursor-pointer text-lg font-semibold"
        >
          X
        </span>
      </div>
      <div className="flex flex-col w-[90%] mx-auto mt-10 gap-2">
        <label className="font-semibold" htmlFor="title">
          title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          placeholder="Enter text"
          className="border rounded-md p-1 border-slate-500 mb-5"
        />
        <label className="font-semibold" htmlFor="subtitle">
          subtitle
        </label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          type="text"
          id="subtitle"
          placeholder="Enter text"
          className="border rounded-md p-1 border-slate-500"
        />
      </div>
      <div className="w-[90%] mx-auto">
        <p className="font-semibold mt-8 mb-3">background color</p>
        <div className="grid grid-cols-4 gap-x-4 gap-y-2 w-[50%]">
          {colors?.map((color, index) => {
            return (
              <div
                key={index}
                className={`border ${
                  activeColor == index && "border-gray-900"
                } rounded-full w-fit p-1`}
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
      </div>
      <button
        onClick={() => {
          dispatch(
            addCreative({ title, subtitle, color: colors[activeColor] })
          );
          dispatch(toggleAddCreativeOpen());
          setTitle("");
          setSubtitle("");
          setActiveColor(null);
        }}
        disabled={title && subtitle && activeColor != null ? false : true}
        className="absolute bottom-[10vh] left-[5%] border-2 px-10 rounded-md py-1 border-slate-800 disabled:border-slate-400 disabled:text-slate-400"
      >
        Done
      </button>
    </div>
  );
};

export default Creative;
