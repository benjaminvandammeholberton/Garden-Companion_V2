import { v4 as uuidv4 } from "uuid";

// assets
import { greenhouse, outdoor, indoor } from "../../../assets/assets-path";

// hooks
import { Dispatch, SetStateAction, useState } from "react";
import useAddArea from "../../../hooks/useAddArea";
import capitalize from "../../../utils/capitalizeStr";
import { AreaInterface } from "../../../interfaces/interfaces";
import { Input } from "@/components/ui/input";
import InputAllVegetables from "../actions/components/InputAllVegetables";
import InputVariety from "../actions/components/InputVariety";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SeedlingsAddProps {
  handleClickAdd: () => void;
  setAreas: Dispatch<SetStateAction<AreaInterface[]>>;
}

// interface FormDataInterface {
//   name: string;
//   environnement: string;
//   surface: number;
// }

const SeedlingsAdd: React.FC<SeedlingsAddProps> = ({
  handleClickAdd,
  setAreas,
}) => {
  // const [input, setInput] = useState("");
  // const [formData, setFormData] = useState<FormDataInterface>({
  //   name: "",
  //   environnement: "",
  //   surface: 0,
  // });
  // const [addData, isLoading] = useAddArea();

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const newArea = {
  //     name: capitalize(formData.name),
  //     surface: formData.surface,
  //     sowing_area: false,
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //   };
  //   await addData(newArea);
  //   setFormData({
  //     name: "",
  //     environnement: "",
  //     surface: 0,
  //   });
  //   setAreas((prevAreas) => [...prevAreas, newArea]);
  //   handleClickAdd();
  // };

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    variety: z.string().min(2).max(50),
    quantity: z.coerce
      .number({
        required_error: "La quantité est requise",
        invalid_type_error: "La quantité doit être un nombre",
      })
      .positive(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      variety: "",
      quantity: 0,
    },
  });
  const { setValue } = form;
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-[280px] justify-around items-center w-3/4 mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={() => (
            <InputAllVegetables
              setInput={(value) => setValue("variety", value)}
            />
          )}
        />
        <FormField
          control={form.control}
          name="variety"
          render={() => <InputVariety setInput={setValue} />}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input type="number" {...field} className="h-8" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Ajouter</Button>
      </form>
    </Form>
  );
};

export default SeedlingsAdd;
// <form
//   className="flex flex-col h-[280px] items-center justify-around"
//   onSubmit={submitForm}
// >
//   {isLoading && <p>Chargement</p>}
//   <div className="flex flex-col items-center gap-5">
//     <div className="flex flex-col gap-2 ">
//       <InputAllVegetables setInput={setInput} />
//     </div>
//     <div className="flex flex-col items-center gap-2">
//       {/* <label htmlFor="surface">Quan</label> */}
//       <div className="flex items-end gap-1">
//         <InputVariety setInput={setInput} />
//       </div>
//     </div>
//   </div>
//   <Button className="w-36 bg-green-300 text-black" type="submit">
//     Ajouter
//   </Button>
// </form>
