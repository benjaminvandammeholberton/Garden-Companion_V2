import { useState } from "react";

type UseModalReturnType = [boolean, (id: string) => void, () => void, string];

const useModal = (): UseModalReturnType => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [areaId, setAreaId] = useState<string>("");

  const openModal = (id: string) => {
    setIsModalOpen(true);
    setAreaId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return [isModalOpen, openModal, closeModal, areaId];
};

export default useModal;
