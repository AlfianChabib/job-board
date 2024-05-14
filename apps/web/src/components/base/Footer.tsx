import MaxWidthWrapper from './MaxWidthWrapper';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-center">
          <p className="text-sm text-slate-500">Copyright © 2024, I-Need. All rights reserved</p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
