import { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Apple, Facebook, Twitter, Twitch, Linkedin, Loader2, AlertCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api';
import { API_URL } from '@api/index';
import { Spinner } from '@components/loaders/spinner';
import { loginUser as loginUserAction } from '../slices';
import { useDispatch } from 'react-redux';

const Page = () => {
  const dispatch = useDispatch();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser
  })
  const [fieldsState, setFieldsState] = useState({});

  const validateForm = (data: { email?: string; password?: string; }) => {
    const { email, password } = data;
    let validated = true;
    if (!email) {
      setFieldsState((prev) => ({
        ...prev, email: {
          "error": true,
          "message": 'Email is required'
        }
      }));

      validated = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {

      setFieldsState((prev) => ({
        ...prev, email: {
          "error": true,
          "message": 'Please enter a valid email address'
        }
      }));

      validated = false;

    } else {
      setFieldsState((prev) => ({
        ...prev, email: {}
      }));
    }

    if (!password) {
      setFieldsState((prev) => ({
        ...prev, password: {
          "error": true,
          "message": 'Password is required'
        }
      }))
      validated = false;
    }

    else {
      setFieldsState((prev) => ({ ...prev, password: {} }))
    }

    return validated;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const data = new FormData(e.target);

    const payload = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }

    if (validateForm(payload)) {
      loginMutation.mutate(payload);
    }
  };



  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };


  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data) {
      dispatch(loginUserAction(loginMutation.data));
    }

  }, [loginMutation.data, loginMutation.isSuccess]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">

        <div className="flex justify-center mb-6">

          <a href="/" className="text-2xl font-bold">
            <span className="text-violet-600">Apex</span>
            <span className="font-normal">Store</span>
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Log in with your Logi ID to continue
        </p>
        {/* 
        {generalError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{generalError}</span>
          </div>
        )} */}


        <form onSubmit={handleLogin} >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Input
                name="email"
                placeholder="Enter your email"
                className={`mt-1 w-full ${fieldsState?.email?.error ? 'border-red-300' : ''}`}
              />
              {fieldsState?.email?.error && <p className="mt-1 text-sm text-red-600">{fieldsState?.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                name="password"
                placeholder="Enter your password"
                className={`mt-1 w-full ${fieldsState?.password?.error ? 'border-red-300' : ''}`}
              />
              {fieldsState?.password?.error && <p className="mt-1 text-sm text-red-600">{fieldsState?.password.message}</p>}
            </div>

            <div className="text-center text-xs text-gray-500 mb-4">
              This site is protected by hCaptcha and its{' '}
              <a href="/privacy" className="text-violet-600 hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-violet-600 hover:underline">
                Terms of Service
              </a>{' '}
              apply.
            </div>

            <Button
              type='submit'
              variant={"default"}
              className="w-full"
              isLoading={loginMutation.isPending}
            >
              LOGIN
            </Button>
          </div>
        </form>

        {/* OR Separator */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-gray-200 w-full" />
          <span className="text-gray-500 text-sm bg-white px-2 whitespace-nowrap">OR CONTINUE WITH</span>
          <div className="border-t border-gray-200 w-full" />
        </div>

        {/* Social Icons */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-md h-10 border-gray-200 hover:bg-gray-50"
            onClick={() => handleSocialLogin('facebook')}
          >
            <Facebook className="h-5 w-5 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md h-10 border-gray-200 hover:bg-gray-50"
            onClick={() => handleSocialLogin('apple')}
          >
            <Apple className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md h-10 border-gray-200 hover:bg-gray-50"
            onClick={() => handleSocialLogin('twitter')}
          >
            <Twitter className="h-5 w-5 text-blue-400" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md h-10 border-gray-200 hover:bg-gray-50"
            onClick={() => handleSocialLogin('twitch')}
          >
            <Twitch className="h-5 w-5 text-purple-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md h-10 border-gray-200 hover:bg-gray-50"
            onClick={() => handleSocialLogin('linkedin')}
          >
            <Linkedin className="h-5 w-5 text-blue-700" />
          </Button>
        </div>

        {/* Create Account Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-violet-600 font-medium hover:text-violet-700"
            >
              Create an account
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Page;