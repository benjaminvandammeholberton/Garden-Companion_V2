// lib
import ReactDOM from "react-dom";

// hooks
import { useContext, useEffect, useState } from "react";

// assets
import { greenhouse } from "../../../../assets/assets-path";
import settingsIcon from "../../../../assets/common/settings.png";

// components
import Diary from "../../../diary/Diary";
import TableProduction from "../../../../components/table-production/TableProduction";
import AreasContext from "@/contexts/AreasContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AreaInterface } from "@/interfaces/interfaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: AreaInterface | undefined;
}

const AreaModal: React.FC<AreaModalProps> = ({ isOpen, onClose, area }) => {
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, deleteArea } = areasContext;

  const { toast } = useToast();

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

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (!target.closest(".area-modal-content") && isOpen) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [isOpen, onClose]);

  const handleDelete = (areaId: string) => {
    onClose();
    const deletedArea = areas.filter(
      (area: AreaInterface) => area.area_id === areaId
    );
    toast({
      title: "Zone de culture suprimée 👍",
      description: `${deletedArea[0].name}`,
    });
    deleteArea(areaId);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
      <div
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
        w-full md:w-[700px] 
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
          <div className="flex gap-3 items-end justify-center">
            <img className="w-10 h-10" src={greenhouse} alt="" />
            <div className="flex items-center gap-2">
              <span className="text-3xl">{area?.name}</span>
              <Popover>
                <PopoverTrigger>
                  <img
                    className="w-4 h-4 cursor-pointer"
                    src={settingsIcon}
                    alt=""
                  />
                </PopoverTrigger>
                <PopoverContent asChild>
                  <div className="flex justify-center gap-5">
                    <Button>Modifier</Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDelete(area?.area_id ?? "")}
                    >
                      Supprimer
                    </Button>
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
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default AreaModal;
