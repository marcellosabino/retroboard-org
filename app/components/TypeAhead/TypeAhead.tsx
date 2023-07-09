import { useEffect, useRef, useState } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useRouter } from "next/navigation";

type Params = {
  data: {
    [key: string]: {
      name: string;
      createdAt: string;
      id: string;
    };
  };
};

export default function TypeAhead({ data }: Params) {
  const router = useRouter();
  const typeAheadRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState(Object.values(data ?? {}));
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEscapeKey(() => setShowSuggestions(false));
  useOutsideClick(typeAheadRef, () => setShowSuggestions(false));

  useEffect(() => {
    setSuggestions(
      Object.values(data ?? {}).filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, data]);

  function goToBoard(boardId: string) {
    router.push(`/boards/${boardId}`);
  }

  return (
    <div className="relative" ref={typeAheadRef}>
      <input
        type="text"
        defaultValue={searchValue}
        placeholder="Search for a previous board..."
        className={`w-full px-3 py-2 rounded-lg ${
          showSuggestions ? "rounded-b-none" : ""
        }`}
        onFocus={() => setShowSuggestions(true)}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {suggestions.length === 0 ? (
        <div
          className={`px-3 py-2 text-sm font-bold w-full absolute bg-white border rounded-b-lg border-t-0 ${
            showSuggestions ? "inherit" : "hidden"
          }`}
        >
          No Results
        </div>
      ) : (
        <ul
          className={`w-full absolute bg-white py-1 border rounded-b-lg border-t-0 max-h-[14rem] overflow-y-auto ${
            showSuggestions ? "inherit" : "hidden"
          }`}
        >
          {suggestions
            .sort((a: any, b: any) => {
              return b.createdAt.localeCompare(a.createdAt);
            })
            .map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => goToBoard(d.id)}
                  className="group flex items-center justify-between w-full hover:bg-brand hover:text-white px-3 py-1.5 text-left duration-0 focus:bg-brand focus:text-white rounded-none outline-none"
                >
                  {d.name}
                  <div className="group-hover:text-white group-focus:text-white text-xs text-gray-500">
                    {d.createdAt.toLocaleString().slice(0, 10)}
                  </div>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
