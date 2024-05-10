import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea, TextareaProps } from '../ui/textarea';

export type FormTextareaProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
} & Omit<TextareaProps, 'name'>;

const FormTextarea = <TFormValues extends FieldValues>(props: FormTextareaProps<TFormValues>) => {
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
            <Textarea {...props} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
