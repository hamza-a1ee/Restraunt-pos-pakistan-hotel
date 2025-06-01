import PrimaryButton from "@/components/button/primary-button.component";
import CustomDialog from "@/components/custom-dialog.component";
import CustomSelect from "@/components/custom-select.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import { cuisinesCategories } from "@/constants";
import { addDishSchema } from "@/schema/dish.schema";
import { ICusine } from "@/shared/interface/user/cusines.interface";
import { TVoidCallback } from "@/shared/types/callbacks.types";
import { useFormik } from "formik";
import { InferType } from "yup";

interface Props {
  open: boolean;
  onOpenChange: TVoidCallback;
  values?: ICusine;
}

export default function AddDishDialog({ onOpenChange, open, values }: Props) {
  const formik = useFormik({
    initialValues: {
      name: values?.name ?? "",
      category: values?.categoryId ?? "",
    },
    validationSchema: addDishSchema,
    onSubmit: (values: InferType<typeof addDishSchema>) => {
      console.log({ values });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onOpenChange();
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={handleClose}
      contentClassName="w-full sm:w-4xl"
    >
      <h1 className="font-bold text-2xl">Add Dish</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4">
        <div className="border border-slate-200 rounded-xl flex flex-col pb-3  p-5">
          <div className="flex items-center sm:flex-row flex-col gap-x-4">
            {" "}
            <InputWithLabel
              label="Name"
              placeholder="Dish Name"
              value={formik.values.name}
              error={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : ""
              }
              onChange={(e) => {
                formik.setFieldTouched("name", true);
                formik.setFieldValue("name", e.target.value);
              }}
            />
            <div className="w-full flex flex-col h-full gap-y-2">
              <label htmlFor="Category" className="text-base font-semibold">
                Category
              </label>
              <CustomSelect
                value={formik.values.category}
                placeholder="Select category..."
                onChange={(e: string) => {
                  formik.setFieldTouched("category", true);
                  formik.setFieldValue("category", e);
                }}
                items={cuisinesCategories.map((cuisine) => ({
                  label: cuisine.name,
                  value: cuisine.id,
                }))}
                error={
                  formik.errors.category && formik.touched.category
                    ? formik.errors.category
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <PrimaryButton
            disabled={!formik.dirty || !formik.isValid}
            className="w-max"
          >
            {values ? "Update" : "Add"}
          </PrimaryButton>
        </div>
      </form>
    </CustomDialog>
  );
}
