'use client'
import React from 'react';

const ErrorPage = ({ statusCode, err }:any) => {
  console.error(err); // Log the error to the console
  return (
    <div>
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }:any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default ErrorPage;