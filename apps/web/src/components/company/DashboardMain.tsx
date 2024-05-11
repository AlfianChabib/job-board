import { DashboardIcon, PersonIcon, TextIcon } from '../icons/MyIcons';

export default function DashboardMain() {
  return (
    <div className="flex flex-col w-full my-4 p-4 items-center bg-background rounded-md gap-4">
      <h2 className="text-2xl font-semibold text-foreground/90">Find the best person for you to hire</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 h-full w-full justify-between items-center gap-8 transition-all">
        <div className="flex flex-col col-span-1 border border-foreground/20 w-full h-60 rounded-md transition-all items-center justify-center hover:border-2 hover:border-primary">
          <TextIcon />
          <div className="text-center px-5">
            <h2 className="text-xl font-bold text-foreground/80">Create a job ad</h2>
            <p className="text-foreground/70">Our step-by-step guide makes posting your job ad quick and easy.</p>
          </div>
        </div>
        <div className="flex flex-col col-span-1 border border-foreground/20 w-full h-60 rounded-md transition-all items-center justify-center hover:border-2 hover:border-primary">
          <DashboardIcon />
          <div className="text-center px-5">
            <h2 className="text-xl font-bold text-foreground/80">Choose your ad type</h2>
            <p className="text-foreground/70">We have three different ad types to suit all your needs.</p>
          </div>
        </div>
        <div className="flex flex-col col-span-1 border border-foreground/20 w-full h-60 rounded-md transition-all items-center justify-center hover:border-2 hover:border-primary">
          <PersonIcon />
          <div className="text-center px-5">
            <h2 className="text-xl font-bold text-foreground/80">Manage your candidates</h2>
            <p className="text-foreground/70">
              We make it easy for you to identify the best candidates applying for your role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
