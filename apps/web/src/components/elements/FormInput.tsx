import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input, InputProps } from '../ui/input';

export type FormInputProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
} & Omit<InputProps, 'name'>;

const FormInput = <TFormValues extends FieldValues>(props: FormInputProps<TFormValues>) => {
  const { name, control } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex w-full items-center justify-between">
            <FormLabel>{props['aria-label']}</FormLabel>
            <FormMessage className="text-xs" />
          </div>
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
