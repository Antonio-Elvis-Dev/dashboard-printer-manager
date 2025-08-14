
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function Error() {

  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <h1 className="text-2xl font-bold text-red-500">Algo deu errado</h1>
      <p className="text-muted-foreground mt-2">
        Não foi possível carregar esta página.
      </p>
      <a href="/" className="text-blue-500 hover:text-blue-700 underline">
        Retornar para Home
      </a>
    </div>
  );
}

