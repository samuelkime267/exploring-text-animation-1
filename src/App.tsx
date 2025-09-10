import { Navbar, Hero, Performance, Legacy, Footer } from "@/components/home";
import ReactLenis from "lenis/react";

function App() {
  return (
    <>
      <ReactLenis root />
      <main className="w-full overflow-hidden">
        <Navbar />
        <div className="space-y-16">
          <div>
            <Hero />
            <Performance />
            <div className="relative h-16 w-full bg-white z-10" />
            {/* <Design /> */}
          </div>
          <Legacy />
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
