import PrimaryButton from "@/components/button/primary-button.component";
import CustomDialog from "@/components/custom-dialog.component";
import CustomSelect from "@/components/custom-select.component";
import InputWithLabel from "@/components/inputs/input-with-label.component";
import { customerSchema } from "@/schema/customer.schema";
import { TVoidCallback } from "@/shared/types/callbacks.types";
import { useFormik } from "formik";
import { InferType } from "yup";

interface Props {
  open: boolean;
  onOpenChange: TVoidCallback;
  values?: InferType<typeof customerSchema>;
}
export default function AddCustomerDialog({
  onOpenChange,
  open,
  values,
}: Props) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: values?.firstName ?? "",
      lastName: values?.lastName ?? "",
      contact: values?.contact ?? "",
      address: values?.address ?? "",
      email: values?.email ?? "",
      gender: values?.gender ?? "",
    },
    validationSchema: customerSchema,
    onSubmit: (values: InferType<typeof customerSchema>) => {
      console.log({ values });
    },
  });

  const onClose = () => {
    formik.resetForm();
    onOpenChange();
  };

  console.log({ values: formik.errors });

  return (
    <CustomDialog
      open={open}
      onOpenChange={onClose}
      contentClassName="sm:w-4xl"
    >
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">{`${
          values ? "Edit" : "Add"
        } Customer`}</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="border border-slate-200 rounded-xl flex flex-col pb-3  p-5">
            <div className="flex items-center sm:flex-row flex-col gap-x-4">
              <InputWithLabel
                label="First Name"
                placeholder="First Name"
                value={formik.values.firstName}
                error={
                  formik.errors.firstName && formik.touched.firstName
                    ? formik.errors.firstName
                    : ""
                }
                onChange={(e) => {
                  formik.setFieldTouched("firstName", true);
                  formik.setFieldValue("firstName", e.target.value);
                }}
              />
              <InputWithLabel
                label="Last Name"
                placeholder="Last Name"
                value={formik.values.lastName}
                error={
                  formik.errors.lastName && formik.touched.lastName
                    ? formik.errors.lastName
                    : ""
                }
                onChange={(e) => {
                  formik.setFieldTouched("lastName", true);
                  formik.setFieldValue("lastName", e.target.value);
                }}
              />
            </div>

            <div className="flex items-center sm:flex-row flex-col gap-x-4">
              <InputWithLabel
                label="Email"
                placeholder="abc@gmail.com"
                value={formik.values.email}
                error={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""
                }
                onChange={(e) => {
                  formik.setFieldTouched("email", true);
                  formik.setFieldValue("email", e.target.value);
                }}
              />
              <InputWithLabel
                label="Phone Number"
                placeholder="0300xxxxxxx"
                value={formik.values.contact}
                error={
                  formik.errors.contact && formik.touched.contact
                    ? formik.errors.contact
                    : ""
                }
                onChange={(e) => {
                  formik.setFieldTouched("contact", true);
                  formik.setFieldValue("contact", e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-x-3">
              <InputWithLabel
                label="Address"
                placeholder="Enter Address"
                value={formik.values.address}
                error={
                  formik.errors.address && formik.touched.address
                    ? formik.errors.address
                    : ""
                }
                onChange={(e) => {
                  formik.setFieldTouched("address", true);
                  formik.setFieldValue("address", e.target.value);
                }}
              />
              <div className="w-full flex flex-col h-full gap-y-2">
                <label
                  htmlFor="Gender"
                  className="text-base font-semibold -mt-2"
                >
                  Gender
                </label>
                <CustomSelect
                  value={formik.values.gender}
                  placeholder="Select Gender..."
                  onChange={(e: string) => {
                    formik.setFieldTouched("gender", true);
                    formik.setFieldValue("gender", e);
                  }}
                  items={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  error={
                    formik.errors.gender && formik.touched.gender
                      ? formik.errors.gender
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end">
            <PrimaryButton
              className="w-max self-end mt-4"
              disabled={!formik.dirty || !formik.isValid}
            >
              {values ? "Update" : "Add"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </CustomDialog>
  );
}
