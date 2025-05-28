import React, { use, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter, usePathname } from 'next/navigation';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

/* Move this CSS to a separate file, e.g., authProvider.css, and import it in your component file:
.amplify-button--primary {
  background: linear-gradient(
    to right,
    var(--amplify-colors-green-80),
    var(--amplify-colors-orange-40)
  );
}
*/

const customComponents = {
  Header() {
    return (
      <View className="mt-4 mb-8 text-center">
        <Heading level={3} className="!text-2xl !font-bold">
          RENT
          <span className="text-secondary-500 font-light hover:!text-primary-300">NQB</span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome</span>, please sign in or sign up to continue.
        </p>
      </View>
    );
  },

  

  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();

      return (
        <>
          <Authenticator.SignUp.FormFields />

          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.['custom:role']}
            hasError={!!validationErrors?.['custom:role']}
            isRequired
            className="mt-4"
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      label: 'Email',
      placeholder: 'Enter your email address',
      isRequired: true,
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      label: 'Username',
      placeholder: 'Enter your username',
      isRequired: true,
    },
    email: {
      order: 2,
      label: 'Email',
      placeholder: 'Enter your email address',
      isRequired: true,
    },
    password: {
      order: 3,
      label: 'Password',
      placeholder: 'Enter your password',
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      label: 'Confirm Password',
      placeholder: 'Re-enter your password',
      isRequired: true,
    },
    
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage = pathname.startsWith("/manager") || pathname.startsWith("/tenant");

  useEffect(() => {
    if (user && isAuthPage){
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  if (!isAuthPage && !isDashboardPage) {

    return <>{children}</>
  }

  return (
  <div className="w-full  bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
    <Authenticator
      initialState={pathname.includes("signup") ? "signUp" : "signIn"}
      components={customComponents}
      formFields={formFields}
    >
      {() => <>{children}</>}
    </Authenticator>
  </div>
  );
};

export default Auth;
