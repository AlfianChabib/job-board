import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import React from 'react';

export type FormCheckboxProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  defaultValue?: boolean;
  label?: string;
  description?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;

const FormCheckbox = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: FormCheckboxProps<TFormValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 h-10">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="flex flex-col pb-2">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
