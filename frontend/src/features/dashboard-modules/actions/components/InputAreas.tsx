// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";
import { unknowIcon } from "../../../../assets/assets-path";
import areaMaps from "../../../../maps/areaEnvironnementsIconsMaps";

import useGetAreas from "../../../../hooks/useGetAreas";
import useCompletion from "../../../../hooks/useCompletion";
import { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputUserAreasInterface {
  setInput: (value: string) => void;
}

const InputUserAreas: React.FC<InputUserAreasInterface> = ({
  setInput,
}) => {
  const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(null)
  const [areas] = useGetAreas();
  const [
    isAreaFocus,
    setIsAreaFocus,
    areaInput,
    areaChoices,
    handleAreaClickOnChoice,
    handleAreaInputChange,
  ] = useCompletion(areas, "name", "data-area");

  useEffect(() => {
    const areaSelected = areas.find((area) => area.name === areaInput);
    if (areaSelected) {
      setInput(areaSelected.area_id ?? "");
      setInputErrorMessage(null);
    } else {
      if (areaInput.length > 0)
        setInputErrorMessage("Zone de culture invalide");
      setInput("");
    }
  }, [areas, areaInput, setInput]);

  const areaObject = areas.find((area) => area.name === areaInput);

  const areaIcon = areaObject
    ? areaMaps.filter(
        (area) => area[areaObject.environnement] !== undefined
      )[0]?.[areaObject.environnement]
    : unknowIcon;

  return (
    <FormItem className="flex flex-col items-center">
      <FormLabel>Zone de culture</FormLabel>
      <div className="relative w-full">
        {areaInput.length > 0 && (
          <img
            className="absolute top-[9px] left-2 w-5"
            src={areaIcon}
            alt=""
          />
        )}
        <FormControl>
        <Input
          value={areaInput}
          onChange={handleAreaInputChange}
          onFocus={() => {
            setIsAreaFocus(true);
          }}
          onBlur={() => {
            setIsAreaFocus(false);
          }}
          className={`pl-9
          ${isAreaFocus ? "" : "cursor-pointer"}
          ${inputErrorMessage ? "border-red-500" : ""}
          `}
        />
        </FormControl>
        <FormMessage />
        {inputErrorMessage && (
          <div className="text-red-500 ml-10">{inputErrorMessage}</div>
        )}
        <div
          className={`
          choices-list 
          flex 
          flex-col 
          gap-1 
          border
          absolute 
          bg-white 
          w-64 
          h-44 
          top-12
          rounded-xl
          px-2
          z-50
          ${!isAreaFocus && "hidden"}
          `}
          onFocus={() => {
            setIsAreaFocus(true);
          }}
          onBlur={() => {
            setIsAreaFocus(false);
          }}
        >
          <ul className="m-1 overflow-y-scroll">
            {areaChoices?.map((area, index) => {
              let areaIcon = "";
              area.environnement === "greenhouse"
                ? (areaIcon = greenhouse)
                : area.environnement === "indoor"
                ? (areaIcon = indoor)
                : area.environnement === "outdoor"
                ? (areaIcon = outdoor)
                : (areaIcon = "");

              return (
                <li
                  key={index}
                  data-area={area.name}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseDown={handleAreaClickOnChoice}
                >
                  <img className="w-6" src={areaIcon} alt="" />
                  <span className="text-lg">{area.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FormItem>
  );
};

export default InputUserAreas;
