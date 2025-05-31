import PrimaryButton from "@/components/button/primary-button.component";
import CustomDialog from "@/components/custom-dialog.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import { addTableSchema } from "@/schema/table.schema";
import { TOneParamCallback } from "@/shared/types/callbacks.types";
import { useFormik } from "formik";
import { InferType } from "yup";

interface Props {
  open: boolean;
  onOpenChange: TOneParamCallback<boolean>;
}
export default function AddTableDialog({ onOpenChange, open }: Props) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: addTableSchema,
    onSubmit: (values: InferType<typeof addTableSchema>) => {
      console.log({ values });
    },
  });
  return (
    <CustomDialog
      contentClassName="max-w-md"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Add Table</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col border border-slate-200 rounded-xl p-5"
        >
          <div className="flex items-center gap-x-5">
            <InputWithLabel
              value={formik.values.name}
              onChange={(e) => {
                formik.setFieldValue("name", e.target.value);
                formik.setFieldTouched("name", true);
              }}
              error={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : ""
              }
              placeholder="Enter Table Name"
              label="Table Name"
            />
            {/* <InputWithLabel/> */}
          </div>
        </form>
        <PrimaryButton
          disabled={!formik.isValid || !formik.dirty}
          className="w-max self-end mt-4"
        >
          Add
        </PrimaryButton>
      </div>
    </CustomDialog>
  );
}
