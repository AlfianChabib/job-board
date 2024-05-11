'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectTrigger, SelectValue } from '../ui/select';

export type FormSelectProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  children: React.ReactNode;
  defaultValue?: string;
  placeholder?: string;
} & Omit<React.ComponentPropsWithoutRef<'select'>, 'name'>;

const FormSelect = <TFormValues extends FieldValues>(props: FormSelectProps<TFormValues>) => {
  const { name, control, children } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <div className="flex w-full items-center justify-between">
            <FormLabel>{props['aria-label']}</FormLabel>
            <FormMessage className="text-xs" />
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={props.disabled}>
            <FormControl className="w-full">
              <div className="w-full">
                <SelectTrigger className="w-full">
                  {!field.value && (
                    <div className="text-muted-foreground hover:text-foreground w-full text-start">
                      {props.placeholder}
                    </div>
                  )}
                  <SelectValue defaultValue={props.defaultValue} className="w-full text-start" />
                </SelectTrigger>
                {children}
              </div>
            </FormControl>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
