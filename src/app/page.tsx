'use client';
import { useAuth } from 'react-oidc-context';

export default function App() {
  const auth = useAuth();

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto px-5 pt-16 max-w-5xl">
        <div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden">
          {/* Card Left */}
          <div className="w-full md:w-1/2 py-10 px-5 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="flex flex-col">
              <figure className="w-full aspect-[4/3] max-w-md rounded bg-cover bg-no-repeat bg-base-200 bg-[url('/job-quest-dashboard-509x388.png')]" />
            </div>
          </div>
          {/* Card Right */}
          <div className="w-full md:w-1/2 py-10 px-7 bg-base-100">
            <div className=" flex flex-col gap-4 pb-14">
              <h1 className="text-3xl font-bold">Job Quest</h1>
              <p>Find your dream job in seconds 🥳</p>
              <div className="h-1 w-14 " />

              <p>
                <strong>Demo Account</strong>
                <br />
                username: job
                <br />
                password: job123
              </p>
              <button
                type="submit"
                onClick={() => auth.signinRedirect()}
                // disabled={form.formState.isSubmitting || login.isPending}
                className="btn btn-primary mt-4 disabled:loading"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
