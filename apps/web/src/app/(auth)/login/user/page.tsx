import Link from 'next/link';
import SignInForm from '@/components/auth/form/SignInForm';
import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginUser() {
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email and password to login</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 items-center">
            <SignInForm type="user" />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register/user" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
