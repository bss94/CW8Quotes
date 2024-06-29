import React, {useCallback, useEffect, useState} from 'react';
import {Quote, QuotesApi} from '../../types';
import axiosApi from '../../axiosApi';
import {Col, Spinner} from 'react-bootstrap';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<QuotesApi | null>('/quotes.json');
    const postsResponse = response.data;
    if (postsResponse !== null) {
      const quotes: Quote[] = Object.keys(postsResponse).map((id: string) => {
        return {
          ...postsResponse[id],
          id,
        };
      });
      console.log(quotes);
      setQuotes(quotes);
    } else {
      setQuotes([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);
  return (
    <>
      <Col/>
      <Col sm={10}>
        {quotes.length === 0 && !isLoading && (
          <h2 className="mt-5 text-center">not quotes yet</h2>
        )}
        {quotes.length > 0 && !isLoading && (
          <h1 className="mt-3">All quotes</h1>
        )}
        {isLoading && (
          <div className="text-center">
            <Spinner className="mt-3" animation="border" variant="primary"/>
          </div>
        )}
        {quotes.map(el => {
          return <div>
            <h6>{el.author}</h6>
            <p>{el.text}</p>
          </div>;
        })}
      </Col>
      <Col/>
    </>
  );
};

export default Home;