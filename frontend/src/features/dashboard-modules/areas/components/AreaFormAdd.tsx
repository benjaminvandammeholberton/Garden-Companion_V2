import { v4 as uuidv4 } from "uuid";

// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// hooks
import { useContext, useState } from "react";

// utils
import capitalize from "../../../../utils/capitalizeStr";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

//contexts
import AreasContext from "@/contexts/AreasContext";

interface AreaFormAddProps {
  handleClickAdd: () => void;
}

interface FormDataInterface {
  name: string;
  environnement: string;
  surface: number;
}

const AreaFormAdd: React.FC<AreaFormAddProps> = ({ handleClickAdd }) => {
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { createArea } = areasContext;
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    environnement: "",
    surface: 0,
  });

  const { toast } = useToast();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArea = {
      name: capitalize(formData.name),
      surface: formData.surface,
      environnement: formData.environnement,
      area_id: uuidv4(),
      sowing_area: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await createArea(newArea);
    setFormData({
      name: "",
      environnement: "",
      surface: 0,
    });
    toast({
      title: "Nouvelle zone de culture 👍",
      description: `${newArea.name}`,
    });
    handleClickAdd();
  };

  return (
    <form
      className="flex flex-col h-[280px] items-center justify-around"
      onSubmit={submitForm}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-around gap-5">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="name">Nom</label>
            <Input
              autoComplete="off"
              required
              className=""
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="surface">Surface</label>
            <div className="flex items-end gap-1">
              <Input
                className="w-20"
                id="surface"
                type="number"
                name="surface"
                value={formData.surface}
                onChange={handleNameChange}
              />
              <span className="leading-none">
                m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>Environnement</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <img className="w-7" src={outdoor} alt="" />
              <label className="font-thin" htmlFor="type1">
                Extérieur
              </label>
              <input
                type="radio"
                name="environnement"
                id="type1"
                value="outdoor"
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-7" src={greenhouse} alt="" />
              <label className="font-thin" htmlFor="type2">
                Serre
              </label>
              <input
                type="radio"
                name="environnement"
                id="type2"
                required
                value="greenhouse"
                onChange={handleNameChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-7" src={indoor} alt="" />
              <label className="font-thin" htmlFor="type3">
                Intérieur
              </label>
              <input
                type="radio"
                name="environnement"
                id="type3"
                required
                onChange={handleNameChange}
                value="indoor"
              />
            </div>
          </div>
        </div>
      </div>
      <Button type="submit">Ajouter</Button>
    </form>
  );
};

export default AreaFormAdd;
