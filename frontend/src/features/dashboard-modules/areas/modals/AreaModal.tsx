// lib
import ReactDOM from "react-dom";

// hooks
import { useEffect, useState } from "react";

// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// components
import Diary from "../../../diary/Diary";
import TableProduction from "../../../../components/table-production/TableProduction";
import { AreaInterface } from "@/interfaces/interfaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

import AreaFormModify from "../components/AreaFormModify";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: AreaInterface | undefined;
}

// function to get the right area icon based of the environnement
const getAreaIcon = (env: string) => {
  let areaIcon: string | undefined;
  if (env === "indoor") areaIcon = indoor;
  if (env === "greenhouse") areaIcon = greenhouse;
  if (env === "outdoor") areaIcon = outdoor;
  return areaIcon;
};

const AreaModal: React.FC<AreaModalProps> = ({ isOpen, onClose, area }) => {
  const [currentArea, setCurrentArea] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    setCurrentArea(area);
  }, [area]);

  const [diaryOpen, setDiaryOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(true);

  const tableDisplay = () => {
    if (!tableOpen) {
      setDiaryOpen(false);
      setTableOpen(true);
    }
  };

  const diaryDisplay = () => {
    if (!diaryOpen) {
      setDiaryOpen(true);
      setTableOpen(false);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
      <Card
        className="
        area-modal-content 
        px-5 
        bg-white 
        fixed 
        left-1/2
        top-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2  
        md:rounded-sm 
        flex 
        flex-col
        w-full md:w-5/6 
        h-full md:h-5/6
        space-y-3
        "
      >
        <div className="space-y-5">
          <div
            className="absolute cursor-pointer top-5 right-5"
            onClick={onClose}
          >
            <span className="p-2 text-4xl md:text-2xl">&times;</span>
          </div>
          <div className="flex gap-3 items-center justify-center">
            <img
              className="w-8 h-8"
              src={getAreaIcon(currentArea?.environnement)}
              alt=""
            />
            <div className="flex items-center gap-2">
              <span className="text-3xl">{currentArea?.name}</span>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <Settings size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent asChild>
                  <div className="flex flex-col justify-center items-center gap-5 w-96 mt-2 mr-30">
                    <AreaFormModify
                      area={currentArea}
                      setArea={setCurrentArea}
                      onClose={onClose}
                      onModify={setIsPopoverOpen}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <ul className="flex justify-center text-lg">
            <li
              onClick={tableDisplay}
              className={`cursor-pointer ${
                tableOpen ? "border-b-2 border-black" : ""
              }  px-2 h-full w-full text-center`}
            >
              Tableau de production
            </li>
            <li
              onClick={diaryDisplay}
              className={`cursor-pointer ${
                diaryOpen ? "border-b-2 border-black" : ""
              }  px-2 h-full w-full text-center`}
            >
              Journal
            </li>
          </ul>
        </div>
        <div className="w-full h-full overflow-scroll px-5 mr-10">
          {diaryOpen ? <Diary area={area} /> : <TableProduction />}
        </div>
      </Card>
    </div>,
    document.getElementById("portal")!
  );
};

export default AreaModal;
