import Link from 'next/link';
import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import RegisterUserForm from '@/components/auth/form/RegisterUserForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterUser() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center min-h-screen justify-center">
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex w-full p-2 justify-between items-center">
          <Link href="/" className="text-base text-muted-foreground hover:text-primary">
            <h1 className="text-2xl font-bold">I-Need</h1>
          </Link>
          <Link
            href="/register/company"
            className="text-base text-muted-foreground decoration-muted-foreground underline underline-offset-4 hover:text-primary hover:decoration-primary"
          >
            Are you looking for employees?
          </Link>
        </div>
        <Card className="md:w-[500px] w-96 transition-all">
          <CardHeader className="items-center">
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your username, email and password to register</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 items-center">
            <RegisterUserForm />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-center text-sm text-muted-foreground">
              Have an account?{' '}
              <Link href="/login/user" className="underline underline-offset-4 hover:text-primary">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
