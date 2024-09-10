import { useContext } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
// assets
import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";

// components
import FormHeader from "./components/FormHeader";
import InputAllVegetables from "./components/InputAllVegetables";
import InputUserAreas from "./components/InputAreas";

// contexts
import VegetablesContext from "@/contexts/VegetableContext";
import AreasContext from "@/contexts/AreasContext";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputVariety from "./components/InputVariety";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { AreaInterface } from "@/interfaces/interfaces";
import { Textarea } from "@/components/ui/textarea";

interface DirectSowingFormInterface {
  onClose: () => void;
}

const DirectSowingForm: React.FC<DirectSowingFormInterface> = ({ onClose }) => {
  const { toast } = useToast();

  const vegetablesContext = useContext(VegetablesContext);
  if (!vegetablesContext) {
    throw new Error(
      "VegetablesContext must be used within an VegetablesProvider"
    );
  }
  const { createVegetable } = vegetablesContext;

  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, setAreas } = areasContext;

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    variety: z.string().min(2).max(50),
    quantity: z.coerce
      .number({
        required_error: "La quantité est requise",
        invalid_type_error: "La quantité doit être un nombre",
      })
      .positive(),
    quantity_unit: z.string().min(2).max(50),
    area: z.string(),
    sowing_date: z.date({}),
    note: z.string().max(500).optional(),
    file: z.instanceof(FileList).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      variety: "",
      quantity: 0,
      quantity_unit: "",
      area: "",
      sowing_date: new Date(),
      note: "",
    },
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      sowing_date: values.sowing_date.toISOString().slice(0, 10),
    };
    try {
      let selected_area: AreaInterface | undefined;
      const newVegetable = await createVegetable(data);
      if (newVegetable) {
        const newAreas = areas.map((area) => {
          if (area.area_id === newVegetable?.area) {
            selected_area = area;
            return {
              ...area,
              vegetables: [...area.vegetables, newVegetable],
            };
          }
          return area;
        });
        setAreas(newAreas);
        toast({
          title: "Nouveau semis 👍",
          description:
            `${newVegetable?.name} - ` +
            `${newVegetable?.variety} ` +
            `${newVegetable?.quantity} ` +
            `dans votre espace: ${selected_area?.name ?? ""}`,
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-4/5">
      <Form {...form}>
        <FormHeader icon={directSowingIcon} name="Semer" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <InputAllVegetables
                setInput={(value) => form.setValue("name", value)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="variety"
            render={() => (
              <InputVariety
                setInput={(value) => form.setValue("variety", value)}
              />
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-4/12">
                  <FormLabel>Quantité</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-8" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity_unit"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-3/6">
                  <FormLabel>Unité</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ligne, rangée, plant, ..."
                      type="text"
                      {...field}
                      className="h-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="area"
            render={() => (
              <InputUserAreas
                setInput={(value) => form.setValue("area", value)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="sowing_date"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value &&
                          format(field.value, "PPP", { locale: fr })}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    className="w-full p-2 border rounded" // Add styling as needed
                    placeholder="Ajoutez une note..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={() => {
              return (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Semer</Button>
        </form>
      </Form>
    </div>
  );
};

export default DirectSowingForm;
