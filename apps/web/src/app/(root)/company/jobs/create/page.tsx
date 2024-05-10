import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import CreateJobForm from '@/components/company/form/CreateJobForm';

export default function page() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen">
        <div className="flex w-full p-2 justify-between items-center">
          <h1>Create Job</h1>
        </div>
        <CreateJobForm />
      </div>
    </MaxWidthWrapper>
  );
}
