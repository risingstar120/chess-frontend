import Link from 'next/link';

export default function login() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-1 bg-gray-800 text-gray-200">
      <Link href='/' className="w-fit h-fit">
        <img
          src="/assets/images/Logo_white.png"
          alt=''
          className=" h-20 mx-auto"
        />
      </Link>
      <h1 className="font-medium tracking-wide">Bienvenido a Reign</h1>
      <p className="tracking-wide">Conéctese con su cuenta Reign para continuar</p>
      <div className="flex gap-x-4 py-4">
        <Link
          href='/auth/signin'
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
        >
          Entrar
        </Link>
        <Link
          href='/auth/signup'
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 "
        >
          Registrarse
        </Link>
      </div>
      <div className="mt-6">
        <div className="flex flex-col gap-y-2 mt-4">
          <Link
            href='/auth/forgot-password'
            className='text-sm text-white/60'
          >
            ¿Has olvidado tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}
