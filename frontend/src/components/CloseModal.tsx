import { CircleX } from "lucide-react";
import { Button } from "./ui/button";

interface CloseModalProps {
  onClose: () => void;
}

const CloseModal: React.FC<CloseModalProps> = ({ onClose }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={onClose}
      size={"icon"}
      className="absolute top-2 right-2"
    >
      <CircleX />
    </Button>
  );
};

export default CloseModal;
