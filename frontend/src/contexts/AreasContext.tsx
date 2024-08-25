import { createAreaApi, getAllAreas } from "@/api/api-services/areas";
import { AreaInterface } from "@/interfaces/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AreaContextType {
  areas: AreaInterface[];
  isLoading: boolean;
  error: string | null;
  createArea: (newArea: Omit<AreaInterface, "id">) => Promise<void>;
  updateArea: (id: string, updatedArea: Omit<AreaInterface, "id">) => void;
  deleteArea: (id: string) => void;
}
const AreasContext = createContext<AreaContextType | undefined>(undefined);

export const AreasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [areas, setAreas] = useState<AreaInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const fetchedAreas = await getAllAreas();
        setAreas(fetchedAreas);
      } catch (error) {
        console.error("Error fetching areas", error);
        setError("Issue when fetching the areas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const createArea = async (
    newArea: Omit<AreaInterface, "id">
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const createdArea = await createAreaApi(newArea);
      setAreas((prevAreas) => [...prevAreas, createdArea]);
    } catch (error) {
      console.error("Error creating area:", error);
      setError("Issue when creating the area");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArea = (id: string) => {
    setAreas((prevAreas) => prevAreas.filter((area) => area.area_id !== id));
  };

  const updateArea = (id: string, updatedArea: AreaInterface) => {
    setAreas((prevAreas) =>
      prevAreas.map((area) => (area.area_id === id ? updatedArea : area))
    );
  };

  return (
    <AreasContext.Provider
      value={{ areas, isLoading, error, createArea, updateArea, deleteArea }}
    >
      {children}
    </AreasContext.Provider>
  );
};

export default AreasContext;
