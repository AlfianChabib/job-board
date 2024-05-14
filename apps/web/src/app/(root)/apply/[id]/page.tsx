interface ApplyProps {
  params: { id: string };
}

export default function Apply({ params }: ApplyProps) {
  return <div>Apply page {params.id}</div>;
}
