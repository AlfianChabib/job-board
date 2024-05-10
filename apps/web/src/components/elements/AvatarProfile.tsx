import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarProfileProps {
  url: string | null;
  name: string | null;
}

export default function AvatarProfile(props: AvatarProfileProps) {
  const { url, name } = props;
  const initialName = name?.charAt(0).toUpperCase();

  return (
    <Avatar className="border-2 border-primary/50">
      <AvatarImage src={url!} alt={name!} />
      <AvatarFallback className="text-primary">{initialName}</AvatarFallback>
    </Avatar>
  );
}
