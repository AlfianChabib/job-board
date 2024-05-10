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
        <FormItem>
          <div className="flex w-full items-center justify-between">
            <FormLabel>{props['aria-label']}</FormLabel>
            <FormMessage className="text-xs" />
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <div>
                <SelectTrigger>
                  {!field.value && (
                    <div className="text-muted-foreground hover:text-foreground w-full text-start">
                      {props.placeholder}
                    </div>
                  )}
                  <SelectValue defaultValue={props.defaultValue} />
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
