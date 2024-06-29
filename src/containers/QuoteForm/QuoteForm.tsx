import React, {useCallback, useEffect, useState} from 'react';
import {QuoteApi} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {enqueueSnackbar} from 'notistack';
import {Button, Col, Form, Spinner} from 'react-bootstrap';
import {CATEGORIES} from '../../constants';

const initialState = {
  text: '',
  category: '',
  author: ''
};
const QuoteForm = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState<QuoteApi>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const {id} = useParams();

  const fetchEditQuote = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi<QuoteApi>(`/quotes/${id}.json`);
    const postResponse = response.data;
    if (postResponse !== null) {
      setQuoteData(response.data);
    }
    setIsLoading(false);
  }, [id]);
  useEffect(() => {
    if (id !== undefined) {
      void fetchEditQuote();
    }
  }, [id, fetchEditQuote]);

  const changeField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = event.target;
    setQuoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    setIsSending(true);
    event.preventDefault();
    const postData = {
      ...quoteData,
    };
    try {
      if (id !== undefined) {
        await axiosApi.put(`/quotes/${id}.json`, postData);
      } else {
        await axiosApi.post('/quotes.json', postData);
      }
      enqueueSnackbar('Posted', {variant: 'success'});
    } catch (e) {
      enqueueSnackbar('Something Wrong', {variant: 'error'});
    } finally {
      setIsSending(false);
      setQuoteData(initialState);
    }
    navigate('/');
  };
  let submitBtn = (<>Save</>);
  if (isSending) {
    submitBtn = (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </>
    );
  }

  return isLoading ?
    <div className="text-center mt-3">
      <Spinner className="mt-3" animation="border" variant="primary"/>
    </div>
    :
    (
      <>
        <Col/>
        <Col sm={10}>
          <Form onSubmit={onFormSubmit} className="mt-3">
            <Form.Text muted><h1>{id ? 'Edit quote' : 'Create quote'}</h1></Form.Text>

            <Form.Group className="mb-3"
                        controlId="title"
            >
              <Form.Label>Author</Form.Label>
              <Form.Select
                name="category"
                value={quoteData.category}
                onChange={changeField}
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map(el => {
                  return <option value={el.id} key={Math.random() * 1000}>{el.title}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3"
                        controlId="title"
            >
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={quoteData.author}
                onChange={changeField}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="body"
            >
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                value={quoteData.text}
                onChange={changeField}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary"
                      type="submit"
                      disabled={isSending}
              >
                {submitBtn}
              </Button>
            </div>
          </Form>
        </Col>
        <Col/>
      </>
    );
};

export default QuoteForm;