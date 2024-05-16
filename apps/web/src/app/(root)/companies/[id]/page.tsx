import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
interface CompaniesPageProps {
  params: {
    id: string;
  };
}

export default function Companies({ params }: CompaniesPageProps) {
  return (
    <MaxWidthWrapper className="min-h-default">
      <div>company {params.id}</div>
    </MaxWidthWrapper>
  );
}
