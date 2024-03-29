import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const handleGoogle = async () => {
    // Redirigir al usuario a la página de inicio de sesión de Google
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sign-in/google`;

    // Manejar el evento onbeforeunload de la ventana emergente
    const popup = window.open('', 'popup', 'width=600,height=600');
    if (popup) {
      popup.onbeforeunload = () => {
        // Redirigir al usuario a la página de inicio en la ventana principal
        window.location.href = '/home';
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.elements?.email?.value,
          username: e.target.elements?.username?.value,
          password: e.target.elements?.password?.value,
        }),
      })
          .then((res) => {
            if (res.ok && res.status === 201) {
              resolve('ok');
            }
            reject(new Error('Network response was not ok.'));
          })
          .catch(() => {
            reject(new Error('Network response was not ok.'));
          });
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href='/' className="w-fit h-fit mx-auto py-4">
          <img src="/assets/images/Logo_black.png" alt="logo" className="h-20 mx-auto" />
        </Link>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form
            onSubmit={(e) => {
              toast.promise(
                  handleSubmit(e),
                  {
                    loading: 'Creando la cuenta...',
                    success: 'Cuenta creada con exito',
                    error: 'Error al crear la cuenta',
                  },
              ).then(() => {
                router.push('/auth/signin');
              }).catch(() => {});
            }}
            className="space-y-6"
            action="#"
            method="POST">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-700">
            Crea tu cuenta
            </h2>
            <p className='text-sm text-center'>
            Tenga en cuenta que para registrarse es necesario verificar su dirección de correo electrónico. Su correo electrónico se utilizará para verificar su identidad por motivos de seguridad.
            </p>
            <div>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Nombre de usuario"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder="Contraseña"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="capitalize flex w-full justify-center rounded-sm border border-transparent bg-emerald/80 hover:bg-emerald/90 duration-300 py-4 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                  continuar
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm font-base tracking-wide">
                ¿Ya tienes cuenta?
                <Link href="/auth/signin" className="ml-1 text-emerald">
                 Entrar
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 select-none">O</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
              <button
                type="submit"
                data-provider="google"
                onClick={handleGoogle}
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <FcGoogle className='w-6 h-6'/>
                <span>Continuar con Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div/>
    </div>
  );
}
