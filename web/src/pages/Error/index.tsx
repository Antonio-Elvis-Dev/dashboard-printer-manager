export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <h1 className="text-2xl font-bold text-red-500">Algo deu errado</h1>
      <p className="text-muted-foreground mt-2">
        Não foi possível carregar esta página.
      </p>
    </div>
  );
}