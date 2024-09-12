import useSort from "../../../hooks/useSort";
import useAdd from "../../../hooks/useAdd";

// components
import SeedlingsAdd from "./SeedlingsAdd";
import SeedlingsList from "./SeedlingsList";

// assets
import { addIcon, sortIcon, backIcon } from "../../../assets/assets-path";

const SeedlingsModule = () => {
  const [isSortOpen, toggleSort, sortedBy, handleClickSort] = useSort(
    localStorage.getItem("sort-seedlings") || "created_at desc"
  );
  const [addOpen, handleClickAdd] = useAdd();

  const sortChoices = [
    ["date d'ajout (ancien en tête)", "created_at asc"],
    ["date d'ajout (récent en tête)", "created_at desc"],
    ["nom (a - z)", "name asc"],
    ["nom (z - a)", "name desc"],
  ];

  return (
    <div>
      <div
        onClick={handleClickAdd}
        className={`absolute top-2 ${
          addOpen ? "right-4" : "right-2"
        } cursor-pointer`}
      >
        <img
          className={addOpen ? "w-8 h-8" : "w-10 h-10"}
          src={addOpen ? backIcon : addIcon}
          alt=""
        />
      </div>
      <div
        className={`absolute top-2 left-2 cursor-pointer ${
          addOpen ? "hidden" : "visible"
        }`}
        onClick={toggleSort}
      >
        <img className="w-10 h-10" src={sortIcon} alt="" />
      </div>
      <div className={`ml-3 ${isSortOpen ? "visible" : "hidden"}`}>
        Trier par :
        <ul className="ml-5">
          {sortChoices.map((choice, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer hover:underline"
                onClick={() => {
                  handleClickSort(choice[1]);
                }}
              >
                - {choice[0]}
              </li>
            );
          })}
        </ul>
      </div>

      {addOpen ? (
        <SeedlingsAdd {...{ handleClickAdd }} />
      ) : (
        <SeedlingsList {...{ sortedBy, handleClickSort }} />
      )}
    </div>
  );
};
export default SeedlingsModule;
