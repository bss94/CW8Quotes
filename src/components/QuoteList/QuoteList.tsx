import React from 'react';
import {Quote} from '../../types';
import QuoteItem from '../QuoteItem/QuoteItem';

interface Props {
  quotes: Quote[];
  deleteQuote: (id: string) => void;
}

const QuoteList: React.FC<Props> = ({quotes, deleteQuote}) => {
  return (
    <>
      {quotes.map(quote => (
        <QuoteItem text={quote.text}
                   author={quote.author}
                   id={quote.id}
                   deleteQuote={() => deleteQuote(quote.id)}
                   key={quote.id}/>
      ))}
    </>
  );
};

export default QuoteList;