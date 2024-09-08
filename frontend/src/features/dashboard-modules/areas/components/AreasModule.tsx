// assets
import { addIcon, sortIcon, backIcon } from "../../../../assets/assets-path";

// components
import AreaList from "./AreaList";
import AreaFormAdd from "./AreaFormAdd";

// hooks
import useModal from "../../../../hooks/useModal";
import useSort from "../../../../hooks/useSort";
import useAdd from "../../../../hooks/useAdd";

// modal
import AreaModal from "../modals/AreaModal";

// interfaces
import { AreaInterface } from "../../../../interfaces/interfaces";

interface AreasModuleProps {
  areas: AreaInterface[];
  isLoadingAreas: boolean;
  errorGetAreas: string | null;
}

const AreasModule: React.FC<AreasModuleProps> = ({
  areas,
  isLoadingAreas,
  errorGetAreas,
}) => {
  const [isSortOpen, toggleSort, sortedBy, handleClickSort] = useSort("name");
  const [addOpen, handleClickAdd] = useAdd();
  const [isModalOpen, openModal, closeModal, area] = useModal();

  return (
    <div>
      {errorGetAreas && (
        <div className="absolute top-36 left-20 font-extralight text-center">
          <p>Impossible de joindre le server.</p>
          <p>Veuillez rafraîchir la page.</p>
        </div>
      )}
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
      <div className={`ml-3 ${isSortOpen && !addOpen ? "visible" : "hidden"}`}>
        Trier par :
        <ul className="ml-5">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleClickSort("name");
            }}
          >
            - Nom
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleClickSort("environnement");
            }}
          >
            - Environnement
          </li>
        </ul>
      </div>
      {addOpen ? (
        <AreaFormAdd {...{ handleClickAdd }} />
      ) : (
        <AreaList {...{ sortedBy, openModal, areas, isLoadingAreas }} />
      )}

      <AreaModal isOpen={isModalOpen} onClose={closeModal} area={area} />
    </div>
  );
};
export default AreasModule;
