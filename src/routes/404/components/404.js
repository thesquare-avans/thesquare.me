import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Error404 = () => (
  <div className="err-container text-center">
    <div className="err">
      <img src="../../assets/react.svg" height="200" width="200" alt="Logo" />
      <h1>404</h1>
      <h2>Sorry, page not found</h2>
    </div>

    <div className="err-body">
      <a href="#/" className="btn btn-raised btn-lg btn-success">
          Go Back to Home Page
      </a>
    </div>
  </div>
);

const Page = () => (
  <div className="page-err">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <Error404 />
      </div>
    </QueueAnim>
  </div>
);

module.exports = Page;
