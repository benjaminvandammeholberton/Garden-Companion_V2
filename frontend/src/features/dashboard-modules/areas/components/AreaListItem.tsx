// Component that render a area description: area icon, the name of the
// area and the list of vegetables that grow in this area

import {
  AreaInterface,
  VegetableInterface,
} from "../../../../interfaces/interfaces";
import VegetableIconsList from "./VegetableIconsList";

interface AreaListItemInterface {
  area: AreaInterface;
  openModal: (id: string) => void;
  areaIcon: string | undefined;
  vegetableUnique: VegetableInterface[];
}

const AreaListItem: React.FC<AreaListItemInterface> = ({
  area,
  openModal,
  areaIcon,
  vegetableUnique,
}) => {
  return (
    <li className="flex gap-3 w-full justify-between">
      <div
        onClick={() => openModal(area.area_id)}
        className="cursor-pointer flex items-center gap-3"
      >
        <img className="w-5 h-5" src={areaIcon} alt="" />
        <span className="text-lg">{area.name}</span>
      </div>
      <VegetableIconsList vegetableUnique={vegetableUnique} />
    </li>
  );
};

export default AreaListItem;
