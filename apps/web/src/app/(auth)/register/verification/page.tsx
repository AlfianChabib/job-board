'use client';

import Link from 'next/link';
import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { jwtVerify } from 'jose';
import { authService } from '@/service/auth-service';
import AlertMessage, { AlertMessageProps } from '@/components/elements/AlertMessage';

export interface VerifyTokenData {
  email: string;
  userId: string;
  userType: string;
  expiry: Date;
}

const decodeToken = async (token: string): Promise<VerifyTokenData> => {
  const secretJwt = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_VERIFICATION_SECRET);
  const jwt = await jwtVerify(token, secretJwt, {
    algorithms: ['HS256'],
  });

  return jwt.payload as unknown as VerifyTokenData;
};

export default function Verification() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [tokenData, setTokenData] = useState<VerifyTokenData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | undefined>(undefined);

  useEffect(() => {
    if (token) {
      decodeToken(token).then((data) => {
        setTokenData(data);
      });
    }
  }, [token]);

  const handleVerify = (token: string, tokenData: VerifyTokenData) => {
    setLoading(true);
    authService
      .verifyAccount(token)
      .then((res) => {
        setAlertMessage({ title: 'Success', message: res.message, type: 'success' });
        router.push(`/login/${tokenData.userType === 'Company' ? 'company' : 'user'}`);
      })
      .catch((error) => {
        setAlertMessage({ title: 'Error', message: error.message, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <MaxWidthWrapper className="flex flex-col items-center min-h-screen justify-center">
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex w-full p-2 justify-between items-center">
          <Link href="/" className="text-base text-muted-foreground hover:text-primary">
            <h1 className="text-2xl font-bold">I-Need</h1>
          </Link>
        </div>
        <Card className="flex flex-col md:w-[500px] w-96 h-96 justify-between transition-all">
          <CardHeader className="items-center">
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>Verify your account by clicking on the link</CardDescription>
          </CardHeader>
          {alertMessage && <AlertMessage {...alertMessage} />}
          {tokenData && token ? (
            <CardContent className="flex flex-col space-y-4 items-center">
              <p className="text-center text-sm w-[80%] text-primary">
                Hello {tokenData.email}, click on the button to verify your account
              </p>
              <Button onClick={() => handleVerify(token, tokenData)} disabled={loading}>
                Verify
              </Button>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col space-y-4 items-center">
              <h2>This request is not valid or expired, please try again</h2>
            </CardContent>
          )}
          <CardFooter className="flex flex-col gap-2">
            <p className="text-center text-sm text-muted-foreground">
              If this request did not come from you, change your account password immediately to prevent further
              unauthorized access.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
