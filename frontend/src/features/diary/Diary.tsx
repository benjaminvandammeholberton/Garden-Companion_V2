import carrotIcon from "../../assets/vegetables-icons/carrot.png";
import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/actions-icons/harvest.png";
import waterIcon from "../../assets/actions-icons/watering.png";
import removeIcon from "../../assets/actions-icons/remove.png";
import treatIcon from "../../assets/actions-icons/parasite.png";
import mulchIcon from "../../assets/actions-icons/mulch.png";
import weedIcon from "../../assets/actions-icons/weed.png";
import fertilizeIcon from "../../assets/actions-icons/fertilize.png";
import placeHolderImage from "../../assets/placeholder-image.jpeg";
import placeHolderImage2 from "../../assets/placeholder-image-2.jpeg";
import { ActionInterface, AreaInterface } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import actionsData from "@/dumb-data/actionsData";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/api/axios";
import vegetableIconsMaps from "@/maps/vegetableMaps";

interface DiaryItemGeneralProps {
  action: ActionInterface;
}

("use client");

export const ActionFilterSelect = ({ icon, text, localStorageName }) => {
  const state = localStorage.getItem(localStorageName);
  const [isSelected, setIsSelected] = useState(true);

  const handleChange = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      localStorage.removeItem(localStorageName);
    } else {
      localStorage.setItem(localStorageName, "selected");
    }
  };

  return (
    <div className="mx-auto">
      <div
        className="flex flex-col items-center justify-between gap-2 cursor-pointer"
        onClick={handleChange}
      >
        <img
          src={icon}
          alt=""
          className="w-10"
          style={{ filter: isSelected ? "" : "grayscale(100%" }}
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
      <p className="text-justify">
        <span className="font-semibold">Notes : </span>
        {action.note}
      </p>
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

const DiaryItemHarvesting = ({ action }) => {
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

const DiaryItemWatering = ({ action }) => {
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

const DiaryItemWeeding = ({ action }) => {
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

const DiaryItemFertilizing = ({ action }) => {
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

const DiaryItemRemoving = ({ action }) => {
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

const DiaryItemMulching = ({ action }) => {
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-12 h-12" src={directSowingIcon} alt="" />
        <img className="w-12 h-12" src={carrotIcon} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.quantity} {action.vegetable.quantity_unit} de{" "}
        {action.vegetable.quantity_unit}- Nantaise{" "}
      </div>
      <p className="text-justify">
        <span className="font-semibold">Notes : </span>
        {action.note}
      </p>
      <img className="w-3/4 rounded-sm" src={placeHolderImage} alt="" />
    </>
  );
};

const DiaryItemTreating = ({ action }) => {
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
    Traîter: [<DiaryItemTreating action={action} />, "Traîtement"],
    Récolter: [<DiaryItemHarvesting action={action} />, "Récolte"],
    Désherber: [<DiaryItemWeeding action={action} />, "Désherbage"],
    Pailler: [<DiaryItemMulching action={action} />, "Paillage"],
    "Fin de culture": [<DiaryItemRemoving action={action} />, "Fin de culture"],
    Création: [<DiaryItemCreating action={action} />, "Création"],
  };

  return (
    <Card className="bg-lime-50 w-full">
      <CardHeader>
        <div className="flex justify-between">
          <span className="text-sm">
            {new Date(action.created_at).toLocaleDateString("fr-FR")}
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
  // const actions = actionsData;
  const [allSelect, SetAllSelect] = useState(true);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const getActions = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/action/");
        console.log(response.data);
        setActions(response.data);
      } catch (error) {
        console.error(error);
        throw new Error("Can't fetch areas from the server");
      }
    };
    getActions();
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 p-4 items-center">
      <Popover>
        <PopoverTrigger>Filter</PopoverTrigger>
        <PopoverContent
          asChild
          className="w-80 flex flex-col items-center gap-2"
        >
          <div className="grid grid-cols-3 gap-8">
            <ActionFilterSelect
              icon={directSowingIcon}
              text={"Semis"}
              localStorageName={"sowingFilterState"}
            />
            <ActionFilterSelect icon={plantingIcon} text={"Plantation"} />
            <ActionFilterSelect icon={waterIcon} text={"Arrosage"} />
            <ActionFilterSelect icon={fertilizeIcon} text={"Fertilisation"} />
            <ActionFilterSelect icon={treatIcon} text={"Traitement"} />
            <ActionFilterSelect icon={harvestIcon} text={"Récolte"} />
            <ActionFilterSelect icon={removeIcon} text={"Fin de culture"} />
            <ActionFilterSelect icon={weedIcon} text={"Désherbage"} />
            <ActionFilterSelect icon={mulchIcon} text={"Paillage"} />
          </div>
        </PopoverContent>
      </Popover>
      {actions.map((action) => {
        if (action.area === area.area_id)
          return <DiaryItemGeneral action={action} key={action.action_id} />;
      })}
    </div>
  );
};

export default Diary;
