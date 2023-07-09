import CreateBoard from "./CreateBoard";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <div className="container">
          <CreateBoard />
        </div>
      </main>
      <Footer />
    </>
  );
}
