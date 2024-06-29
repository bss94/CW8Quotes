import React, {useCallback, useEffect, useState} from 'react';
import {Quote, QuotesApi} from '../../types';
import axiosApi from '../../axiosApi';
import {Col, Spinner} from 'react-bootstrap';
import QuoteList from '../../components/QuoteList/QuoteList';
import QuoteNav from '../../components/QuoteNav/QuoteNav';
import {useParams} from 'react-router-dom';
import {CATEGORIES} from '../../constants';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentCategory = useParams();

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    let response=null;
    if(Object.keys(currentCategory).length === 0){
       response = await axiosApi.get<QuotesApi | null>('/quotes.json');
    }else {
      response = await axiosApi.get<QuotesApi | null>(`/quotes.json?orderBy="category"&equalTo="${currentCategory.category}"`);
    }
    const quoteResponse = response.data;
    if (quoteResponse !== null) {
      const quotes: Quote[] = Object.keys(quoteResponse).map((id: string) => {
        return {
          ...quoteResponse[id],
          id,
        };
      });
      console.log(quotes);
      setQuotes(quotes);
    } else {
      setQuotes([]);
    }
    setIsLoading(false);
  }, [currentCategory]);
  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  let pagesTitle = 'All quotes';
  if(Object.keys(currentCategory).length !== 0){
    pagesTitle=CATEGORIES.find(el=>{return  el.id===currentCategory.category}).title
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
            <QuoteList quotes={quotes}/>
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