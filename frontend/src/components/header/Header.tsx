import { useState } from "react";
import { KeyRound, LogOut, NotebookPen } from "lucide-react";

import HeaderModal from "../../modal/HeaderModal";
import { useNavigate } from "react-router-dom";
import NavbarMobile from "../navbar/NavbarMobile";
import { ModeToggle } from "./ToogleTheme";
import { Button } from "../ui/button";

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalNavBarOpen, setIsModalNavBarOpen] = useState<boolean>(false);

  const closeModalNavBar = () => {
    setIsModalNavBarOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleLogout = () => {
    localStorage.removeItem("JWTGP");
    navigate("/");
  };
  return (
    <div className="w-full fixed top-0 z-50 border-b">
      <div className=" bg-white dark:bg-slate-800 opacity-95 flex items-center justify-between w-full border-b px-10 py-2">
        <div className="flex gap-5 items-center">
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={"20"} />
            <span className="sr-only">Logout</span>
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <KeyRound size={"20"} />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl font-thin ">
            Garden Companion <span className="text-sm lg:text-xl ">Beta</span>
          </h1>
          <span className="font-thin lg:text-md">
            {today.toLocaleDateString("fr-FR", options)}
          </span>
        </div>
        <div className="flex gap-5 items-center">
          <Button variant={"ghost"} size={"icon"}>
            <NotebookPen size={"20"} />
          </Button>
          <ModeToggle size={"20"} />
        </div>
      </div>
      <HeaderModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={closeModal}
      />
      <NavbarMobile onClose={closeModalNavBar} isOpen={isModalNavBarOpen} />
    </div>
  );
};
export default Header;
