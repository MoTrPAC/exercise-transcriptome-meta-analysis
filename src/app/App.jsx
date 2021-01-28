import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import AnalysisConnected from '../features/analysis/analysis';
import About from '../features/about/about';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header-container">
          <Header />
        </header>
        <section className="main">
          <Switch>
            <Route path="/" exact component={AnalysisConnected} />
            <Route path="/about" component={About} />
          </Switch>
        </section>
        <footer className="footer mt-auto">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
