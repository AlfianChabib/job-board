'use client';

import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { dataService } from '@/service/data-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { userService } from '@/service/user-service';

export default function SelectSkill() {
  const queryClient = useQueryClient();
  const [text, setText] = useState<string | undefined>(undefined);
  const [debouncedText] = useDebounce(text, 500);
  const { data: skills } = useQuery({
    queryKey: ['skills', debouncedText],
    queryFn: () => dataService.skills(debouncedText),
    enabled: debouncedText !== undefined,
  });

  const handleChange = useDebouncedCallback((text: string) => {
    setText(text);
  }, 1000);

  const { mutate } = useMutation({
    mutationFn: (text: string) => userService.addUserSkill(text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  const handleAssign = (Text: string) => {
    setText(undefined);
    mutate(Text);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-max">
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
        </DialogHeader>
        <Input onChange={(e) => handleChange(e.target.value)} placeholder="Add your skill" />
        <ul className="flex flex-col gap-1">
          {skills?.map((item, index) => (
            <li key={index} className="flex items-center justify-between rounded-sm p-2 hover:bg-gray-100">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium capitalize">{item.Text}</p>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleAssign(item.Text)}>
                <Plus size={18} />
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
