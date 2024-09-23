import { useState } from "react";

import PlantManagerModal from "../../../modal/PlantManagerModal";

import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";
import harvestIcon from "../../../assets/actions-icons/harvest.png";
import plantingIcon from "../../../assets/actions-icons/planting.png";
import removeIcon from "../../../assets/actions-icons/remove.png";
import cameraIcon from "../../../assets/actions-icons/camera.png";
import wateringIcon from "../../../assets/actions-icons/watering.png";
import fertilizeIcon from "../../../assets/actions-icons/fertilize.png";
import weedIcon from "../../../assets/actions-icons/weed.png";
import parasiteIcon from "../../../assets/actions-icons/parasite.png";
// import cameraIcon from "../../../assets/actions-icons/camera.png";
// import noteIcon from "../../../assets/actions-icons/pin.png";

interface ActionsModuleProps {}

const ActionsModule: React.FC<ActionsModuleProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const closeModal = () => setIsModalOpen(false);
  const openModal = (content: string | null) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  return (
    <div className="flex justify-center h-5/6">
      <div
        className="
      grid
      grid-cols-3
      place-content-around
      gap-6
      "
      >
        <div
          onClick={() => openModal("direct-sowing")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={directSowingIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Semer</p>
        </div>
        <div
          onClick={() => openModal("planting")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={plantingIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Planter</p>
        </div>
        <div
          onClick={() => openModal("water")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={wateringIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Arroser</p>
        </div>
        <div
          onClick={() => openModal("fertilize")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={fertilizeIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Fertiliser</p>
        </div>
        <div
          onClick={() => openModal("treat")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={parasiteIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Traiter</p>
        </div>
        <div
          onClick={() => openModal("harvest")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={harvestIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Récolter</p>
        </div>

        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={removeIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white text-center">
            Fin de culture
          </p>
        </div>

        <div
          onClick={() => openModal("weed")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={weedIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Désherber</p>
        </div>

        <div
          onClick={() => openModal("observation")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img className="w-12" src={cameraIcon} alt="" />
          <p className="text-sm text-gray-500 dark:text-white">Observation</p>
        </div>
      </div>
      {/* <div className="flex justify-center gap-20 mt-5">
        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            className="w-12"
            src={cameraIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Photo</p>
        </div>

        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            className="w-12"
            src={noteIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Note</p>
        </div>
      </div> */}
      <PlantManagerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        actionName={modalContent}
      />
    </div>
  );
};
export default ActionsModule;
