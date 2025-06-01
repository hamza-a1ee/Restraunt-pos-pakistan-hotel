import PrimaryButton from "@/components/button/primary-button.component";
import CustomDialog from "@/components/custom-dialog.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import { addCategorySchema } from "@/schema/category.schema";
import { ICusineCategory } from "@/shared/interface/user/cusines.interface";
import { TVoidCallback } from "@/shared/types/callbacks.types";
import { useFormik } from "formik";
import { InferType } from "yup";

interface Props {
  open: boolean;
  onOpenChange: TVoidCallback;
  values?: ICusineCategory;
}

export default function AddCategoryDialog({
  onOpenChange,
  open,
  values,
}: Props) {
  const formik = useFormik({
    initialValues: {
      name: values?.name ?? "",
    },
    validationSchema: addCategorySchema,
    onSubmit: (values: InferType<typeof addCategorySchema>) => {
      console.log(values);
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
      contentClassName="w-full sm:w-2xl"
    >
      <h1 className="font-bold text-2xl">Add Category</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4">
        <div className="border border-slate-200 rounded-xl flex flex-col pb-3  p-5">
          <div className="flex items-center sm:flex-row flex-col gap-x-4">
            <InputWithLabel
              label="Name"
              placeholder="Name"
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
