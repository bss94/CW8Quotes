import Toolbar from './components/Toolbar/Toolbar';
import {Container, Row} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';
import QuoteForm from './containers/QuoteForm/QuoteForm';
import Home from './containers/Home/Home';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <Container>
      <Row>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
          <Route path="/quotes/:category" element={<Home/>}/>
          <Route path="/quotes/:id/edit" element={<QuoteForm/>}/>
          <Route path="/add-quote" element={<QuoteForm/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
      </Row>
    </Container>
  </>
);

export default App;
