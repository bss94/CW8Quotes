import Toolbar from './components/Toolbar/Toolbar';
import {Container, Row} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';
import QuoteForm from './containers/QuoteForm/QuoteForm';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <Container>
      <Row>
        <Routes>
          <Route path="/" element={<QuoteForm/>}>
          </Route>
          <Route path="/quotes/:id/edit" element={<div/>}/>
          <Route path="/add-quote" element={<div/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
      </Row>
    </Container>
  </>
);

export default App
