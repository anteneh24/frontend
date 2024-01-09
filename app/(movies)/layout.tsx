export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white bg-background">
      <div className="max-w-6xl mx-auto py-32 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
