// import WeedForm from "@/features/dashboard-modules/actions/WeedForm";
import DirectSowingForm from "../features/dashboard-modules/actions/DirectSowingForm";
// import HarvestForm from "../features/dashboard-modules/actions/HarvestForm";
// import IndirectSowingForm from "../features/dashboard-modules/actions/IndirectSowingForm";
import PlantingForm from "../features/dashboard-modules/actions/PlantingForm";
// import RemoveForm from "../features/dashboard-modules/actions/RemoveForm";
// import MulchForm from "@/features/dashboard-modules/actions/MulchForm";
// import TreatForm from "@/features/dashboard-modules/actions/TreatForm";
// import WaterForm from "@/features/dashboard-modules/actions/WaterForm";
// import FertilizeForm from "@/features/dashboard-modules/actions/WaterForm";

interface RenderPlantManagerModalContentProps {
  content: string | null;
  onClose: () => void;
  defaultValues?: object
}

const RenderPlantManagerModalContent: React.FC<
  RenderPlantManagerModalContentProps
> = ({ content, onClose, defaultValues }) => {
  switch (content) {
    case "direct-sowing":
      return <DirectSowingForm onClose={onClose} />;
    // case "indirect-sowing":
    //   return <IndirectSowingForm />;
    case "planting":
      return <PlantingForm onClose={onClose} defaultValues={defaultValues}/>;
    // case "harvest":
    //   return <HarvestForm onClose={onClose}/>;
    // case "remove":
    //   return <RemoveForm onClose={onClose} />;
    // case "weed":
    //   return <WeedForm onClose={onClose} />;
    // case "mulch":
    //   return <MulchForm onClose={onClose} />;
    // case "treat":
    //   return <TreatForm onClose={onClose} />;
    // case "fertilize":
    //   return <FertilizeForm onClose={onClose} />;
    // case "water":
    //   return <WaterForm onClose={onClose} />;
    default:
      return null;
  }
};

export default RenderPlantManagerModalContent;
