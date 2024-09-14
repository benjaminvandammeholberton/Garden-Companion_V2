import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LocationForm = () => {
  const formSchema = z.object({
    country: z.string().min(2).max(50),
    post_code: z.string().min(1).max(10),
    city: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      post_code: "",
      city: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5"
      >
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center w-3/5">
              <FormLabel>Pays</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-slate-700 h-9">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Belgique">Belgique</SelectItem>
                  <SelectItem value="Suisse">Suisse</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="post_code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center w-3/5">
              <FormLabel>Code Postal</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  disabled={form.getValues()["country"] === ""}
                  className="h-9"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center w-3/5">
              <FormLabel>Ville</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={
                  form.getValues()["country"] === "" ||
                  form.getValues()["post_code"] === ""
                }
              >
                <FormControl>
                  <SelectTrigger className="border-slate-700 h-9">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent></SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.getValues()["country"] === "" ||
            form.getValues()["post_code"] === "" ||
            form.getValues()["city"] === ""
          }
        >
          Valider
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;
