import React from 'react';
import {Quote} from '../../types';
import QuoteItem from '../QuoteItem/QuoteItem';

interface Props {
  quotes: Quote[];
}

const QuoteList : React.FC<Props>= ({quotes}) => {
  return (
    <>
      {quotes.map(quote=>(
        <QuoteItem text={quote.text} author={quote.author} id={quote.id} key={quote.id}/>
      ))}
    </>
  );
};

export default QuoteList;