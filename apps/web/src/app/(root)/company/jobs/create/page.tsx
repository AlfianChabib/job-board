import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import CreateJobForm from '@/components/company/form/CreateJobForm';

export default function page() {
  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col">
        <div className="flex flex-col w-full p-4 justify-between my-4 bg-background border rounded-md">
          <h1 className="text-xl font-semibold text-foreground/80">Create a new job</h1>
          <p className="text-sm text-foreground/70">Complete the form below to create a new job.</p>
        </div>
        <CreateJobForm />
      </div>
    </MaxWidthWrapper>
  );
}
