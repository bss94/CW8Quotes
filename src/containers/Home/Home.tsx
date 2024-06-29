import React, {useCallback, useEffect, useState} from 'react';
import {Quote, QuotesApi} from '../../types';
import axiosApi from '../../axiosApi';
import {Col, Spinner} from 'react-bootstrap';
import QuoteList from '../../components/QuoteList/QuoteList';
import QuoteNav from '../../components/QuoteNav/QuoteNav';
import {useNavigate, useParams} from 'react-router-dom';
import {CATEGORIES} from '../../constants';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentCategory = useParams();
  const navigate = useNavigate();

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    let response;
    if (Object.keys(currentCategory).length === 0) {
      response = await axiosApi.get<QuotesApi | null>('/quotes.json');
    } else {
      response = await axiosApi.get<QuotesApi | null>(`/quotes.json?orderBy="category"&equalTo="${currentCategory.category}"`);
    }
    const quoteResponse = response.data;
    if (quoteResponse !== null && Object.keys(quoteResponse).length !== 0) {
      const quotes: Quote[] = Object.keys(quoteResponse).map((id: string) => {
        return {
          ...quoteResponse[id],
          id,
        };
      });
      setQuotes(quotes);
    } else {
      setQuotes([]);
    }
    setIsLoading(false);
  }, [currentCategory]);

  const deleteQuote = useCallback(async (id) => {
    await axiosApi.delete(`/quotes/${id}.json`);
    navigate(`/`);
  }, [navigate]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes, deleteQuote]);

  let pagesTitle = 'All quotes';
  if (Object.keys(currentCategory).length !== 0) {
    pagesTitle = CATEGORIES.find(el => {
      return el.id === currentCategory.category;
    }).title;
  }
  return (
    <>
      <Col/>
      <Col sm={2}>
        <QuoteNav/>
      </Col>
      <Col sm={8}>
        <h1 className="mt-3">{pagesTitle}</h1>
        {quotes.length === 0 && !isLoading && (
          <h4 className="mt-5">Not quotes yet</h4>
        )}
        {quotes.length > 0 && !isLoading && (
          <>
            <QuoteList quotes={quotes} deleteQuote={deleteQuote}/>
          </>
        )}
        {isLoading && (
          <div className="text-center">
            <Spinner className="mt-3" animation="border" variant="primary"/>
          </div>
        )}
      </Col>
      <Col/>
    </>
  );
};
export default Home;