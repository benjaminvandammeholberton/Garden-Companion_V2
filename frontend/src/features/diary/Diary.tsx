import carrotIcon from "../../assets/vegetables-icons/carrot.png";
import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/actions-icons/harvest.png";
import waterIcon from "../../assets/actions-icons/watering.png";
import removeIcon from "../../assets/actions-icons/remove.png";
import treatIcon from "../../assets/actions-icons/parasite.png";
import cameraIcon from "../../assets/actions-icons/camera.png";
import weedIcon from "../../assets/actions-icons/weed.png";
import fertilizeIcon from "../../assets/actions-icons/fertilize.png";
import placeHolderImage from "../../assets/placeholder-image.jpeg";

import { ActionInterface, AreaInterface } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/api/axios";
import vegetableIconsMaps from "@/maps/vegetableMaps";
import DirectSowingForm from "../dashboard-modules/actions/DirectSowingForm";
import { Filter } from "lucide-react";

interface DiaryItemGeneralProps {
  action: ActionInterface;
}

export const ActionFilterSelect = ({
  icon,
  text,
  type,
  actionTypes,
  setActionTypes,
}) => {
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    setIsSelected(actionTypes.includes(type));
  }, []);

  const handleClick = () => {
    if (actionTypes.includes(type)) {
      setActionTypes((prev) =>
        prev.filter((actionType) => actionType !== type)
      );
    } else {
      setActionTypes((prev) => [...prev, type]);
    }
    setIsSelected(!isSelected);
  };

  return (
    <div className="mx-auto">
      <div
        className="flex flex-col items-center justify-between gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={icon}
          alt=""
          className="w-10"
          style={{ filter: isSelected ? "" : "grayscale(100%)" }}
        />
        <span
          className={`text-sm text-center font-medium leading-none ${
            isSelected ? "font-medium" : "font-thin"
          } `}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

const DiaryItemDirectSowing = ({ action }) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={directSowingIcon} alt="" />
        <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemPlanting = ({ action }) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={plantingIcon} alt="" />
        <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemHarvesting = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={harvestIcon} alt="" />
        {vegetableAsset && (
          <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.harvest_quantity} {action.harvest_unit || "kg"}{" "}
        {action.fertilizer_unit || ""}{" "}
        {action.vegetable &&
          `de : ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemWatering = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={waterIcon} alt="" />
        {vegetableAsset && (
          <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.watering_quantity || ""} {action.watering_unit || ""}{" "}
        {action.vegetable &&
          `: ${action.vegetable.name} (
        ${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemWeeding = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={weedIcon} alt="" />
        {vegetableAsset && (
          <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.vegetable &&
          `${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemFertilizing = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={treatIcon} alt="" />
        {vegetableAsset && (
          <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.fertilizer_name} : {action.fertilizer_quantity || ""}{" "}
        {action.fertilizer_unit || ""}{" "}
        {action.vegetable &&
          `pour ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemRemoving = ({ action }) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={removeIcon} alt="" />
        <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety})
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemObservation = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={cameraIcon} alt="" />
        {vegetableAsset && (
          <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.vegetable?.name &&
          `${action.vegetable.name} (${action.vegetable.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemTreating = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = "http://127.0.0.1:8001/" + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={treatIcon} alt="" />
        {vegetableAsset && (
          <img className="w-12 h-12" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.treatment_name} : {action.treatment_quantity || ""}{" "}
        {action.treatment_unit || ""}{" "}
        {action.vegetable &&
          `sur ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemCreating = ({ action }) => {
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={directSowingIcon} alt="" />
        <img className="w-12 h-12" src={carrotIcon} alt="" />
      </div>
      <div className="cursor-pointer">4 rangées de Carotte - Nantaise </div>
      <p className="text-justify">
        <span className="font-semibold">Notes : </span>
        {action.note}
      </p>
      <img className="w-3/4 rounded-sm" src={placeHolderImage} alt="" />
    </>
  );
};

interface DiaryItemGeneralProps {
  action: ActionInterface;
}

const DiaryItemGeneral: React.FC<DiaryItemGeneralProps> = ({ action }) => {
  const actionComponentMap = {
    Semer: [<DiaryItemDirectSowing action={action} />, "Semis"],
    Planter: [<DiaryItemPlanting action={action} />, "Plantation"],
    Arroser: [<DiaryItemWatering action={action} />, "Arrosage"],
    Fertiliser: [<DiaryItemFertilizing action={action} />, "Fertilisation"],
    Traiter: [<DiaryItemTreating action={action} />, "Traitement"],
    Récolter: [<DiaryItemHarvesting action={action} />, "Récolte"],
    Désherber: [<DiaryItemWeeding action={action} />, "Désherbage"],
    Observation: [<DiaryItemObservation action={action} />, "Observation"],
    "Fin de culture": [<DiaryItemRemoving action={action} />, "Fin de culture"],
    Création: [<DiaryItemCreating action={action} />, "Création"],
  };

  return (
    <Card className="w-full lg:w-[800px]">
      <CardHeader>
        <div className="flex justify-between">
          <span className="text-sm">
            {new Date(action.date).toLocaleDateString("fr-FR")}
          </span>
          <span className="text-sm font-semibold">
            {actionComponentMap[action.type][1]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4">
        {actionComponentMap[action.type][0]}
      </CardContent>
    </Card>
  );
};

interface DiarayProps {
  area: AreaInterface | undefined;
}
const Diary: React.FC<DiarayProps> = ({ area }) => {
  const actionType = [
    "Semer",
    "Planter",
    "Fin de culture",
    "Récolter",
    "Arroser",
    "Fertiliser",
    "Traiter",
    "Désherber",
    "Observation",
  ];
  const [actions, setActions] = useState([]);
  const [actionTypes, setActionTypes] = useState(actionType);

  useEffect(() => {
    const getActions = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/action/?area_id=${area?.area_id}`
        );
        setActions(response.data);
      } catch (error) {
        console.error(error);
        throw new Error("Can't fetch areas from the server");
      }
    };
    getActions();
  }, [area]);

  const ActionFilterList = [
    { icon: directSowingIcon, text: "Semis", type: "Semer" },
    { icon: plantingIcon, text: "Plantation", type: "Planter" },
    { icon: waterIcon, text: "Arrosage", type: "Arroser" },
    { icon: fertilizeIcon, text: "Fertilisation", type: "Fertiliser" },
    { icon: treatIcon, text: "Traitement", type: "Traiter" },
    { icon: harvestIcon, text: "Récolte", type: "Récolter" },
    { icon: removeIcon, text: "Fin de culture", type: "Fin de culture" },
    { icon: weedIcon, text: "Désherbage", type: "Désherber" },
    { icon: cameraIcon, text: "Observation", type: "Observation" },
  ];

  return (
    <div className="w-full flex flex-col gap-5 p-4 items-center">
      <Popover>
        <PopoverTrigger asChild className="gap-2">
          <Button>
            <Filter strokeWidth={1.5} />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent
          asChild
          className="w-80 flex flex-col items-center gap-2"
        >
          <div className="grid grid-cols-3 gap-8">
            {ActionFilterList.map((action) => (
              <ActionFilterSelect
                key={action.type}
                icon={action.icon}
                text={action.text}
                type={action.type}
                actionTypes={actionTypes}
                setActionTypes={setActionTypes}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {actions
        .filter(
          (action) =>
            action.area === area.area_id && actionTypes.includes(action.type)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((action) => (
          <DiaryItemGeneral action={action} key={action.action_id} />
        ))}
    </div>
  );
};

export default Diary;
