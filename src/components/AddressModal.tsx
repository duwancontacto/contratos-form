"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import ErrorLabel from "./ErrorLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddress } from "../utils/FormHelper";
import { Input } from "./ui/input";

interface IContentModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  addressOption: string;
  setExternalValue: (label: string, value: string) => void;
  //eslint-disable-next-line
  data: {
    listaDireccion: {
      direccion: {
        estado: string;
        ciudad: string;
        numeroExterior: string;
        numeroInterior: string;
        colonia: string;
        codigoPostal: string;
        delgacionMunicipio: string;
        referncias: string;
        calle: string;
        id: string;
      };
    }[];
  };
}

export default function AddressModal({
  open,
  setOpen,
  data,
  setExternalValue,
  addressOption,
}: IContentModalProps) {
  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAddress),
    defaultValues: {
      option:
        data.listaDireccion?.length > 0
          ? data.listaDireccion[0].direccion.id
          : "",
    },
  });

  useEffect(() => {
    if (open) {
      reset();

      setValue(
        "option",
        data.listaDireccion.find((item) => item.direccion.id === addressOption)
          ?.direccion.id || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  //eslint-disable-next-line
  const onSubmit = (form: any) => {
    const selectedDireccion = data.listaDireccion?.find(
      //eslint-disable-next-line
      (direccion: any) => direccion.direccion.id === form.option
    );

    if (selectedDireccion) {
      const {
        calle,
        numeroExterior,
        numeroInterior,
        colonia,
        codigoPostal,
        delgacionMunicipio,
        estado,
        ciudad,
        referncias,
        id,
      } = selectedDireccion.direccion;

      setExternalValue("street", calle);
      setExternalValue("ext_num", numeroExterior);
      setExternalValue("int_num", numeroInterior);
      setExternalValue("colony", colonia);
      setExternalValue("cp", codigoPostal);
      setExternalValue("municipe", delgacionMunicipio);
      setExternalValue("state", estado);
      setExternalValue("city", ciudad);
      setExternalValue("street_distance", referncias);
      setExternalValue("addressOption", id);

      setOpen(false);
    }
  };

  const selectedDireccion = data.listaDireccion?.find(
    (direccion) => direccion.direccion.id === watch("option")
  );

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-[625px] w-full">
        <DialogHeader>
          <DialogTitle>Seleccionar otra direccion</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label className="" htmlFor="option">
              Direccion
              <ErrorLabel name="option" errors={errors} />
            </Label>
            <Select
              value={watch("option")}
              onValueChange={(value) =>
                setValue("option", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className={errors.option ? "border-red-500" : ""}>
                <SelectValue id="option" placeholder="Seleccionar direccion" />
              </SelectTrigger>
              <SelectContent>
                {data.listaDireccion?.map((item, index: number) => (
                  <SelectItem key={index} value={item.direccion.id}>
                    {item.direccion.estado} / {item.direccion.ciudad} /{" "}
                    {item.direccion.calle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2  gap-4">
            <div className="grid gap-2">
              <Label className="" htmlFor="street">
                Calle
              </Label>
              <Input
                type="text"
                id="street"
                placeholder="Ejemplo: Calle 123"
                disabled
                value={selectedDireccion?.direccion.calle}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="ext_num">
                Número Ext
              </Label>
              <Input
                type="text"
                id="ext_num"
                placeholder="Ejemplo: 123"
                disabled
                value={selectedDireccion?.direccion.numeroExterior}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="int_num">
                Número Int
              </Label>
              <Input
                type="text"
                id="int_num"
                placeholder="Ejemplo: 123"
                disabled
                value={selectedDireccion?.direccion.numeroInterior}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="colony">
                Colonia
              </Label>
              <Input
                type="text"
                id="colony"
                placeholder="Ejemplo: Colonia Centro"
                disabled
                value={selectedDireccion?.direccion.colonia}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="cp">
                C.P
              </Label>
              <Input
                type="number"
                id="cp"
                placeholder="Ejemplo: 12345"
                disabled
                value={selectedDireccion?.direccion.codigoPostal}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="municipe">
                Alcaldía / Municipio
              </Label>
              <Input
                type="text"
                id="municipe"
                placeholder="Ejemplo: Cuauhtémoc"
                disabled
                value={selectedDireccion?.direccion.delgacionMunicipio}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="state">
                Estado
              </Label>
              <Input
                type="text"
                id="state"
                placeholder="Ejemplo: Ciudad de México"
                disabled
                value={selectedDireccion?.direccion.estado}
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="city">
                Ciudad
              </Label>
              <Input
                type="text"
                id="city"
                placeholder="Ejemplo: Ciudad de México"
                disabled
                value={selectedDireccion?.direccion.ciudad}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Seleccionar</Button>
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
