import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import PreviousWorks from './components/PreviousWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <PreviousWorks />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;