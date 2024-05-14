interface JobProps {
  params: {
    id: string;
  };
}

export default function Job({ params }: JobProps) {
  return (
    <div>
      <h1>Job: {params.id}</h1>
    </div>
  );
}
