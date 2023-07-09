import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="h-full mb-3">
        <div className="container h-full">{children}</div>
      </main>
      <Footer />
    </>
  );
}
