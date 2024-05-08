import MaxWidthWrapper from './MaxWidthWrapper';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <p className="text-sm text-slate-500">I-Need</p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
