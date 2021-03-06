import React from 'react';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Route Test', () => {
  it('App으로 Render시 타임라인 페이지가 보인다.', async () => {
    const history = createMemoryHistory();

    render(
        <Router navigator={history} location={history.location}>
          <App />
        </Router>,
    );

    const title = await screen.findByText(/타임라인 페이지/);

    expect(title).toBeInTheDocument();
  });

  it('/로 접근 시 타임라인 페이지가 보인다.', async () => {
    const history = createMemoryHistory();

    history.push('/');

    render(
        <Router navigator={history} location={history.location}>
          <App />
        </Router>,
    );

    const title = await screen.findByText(/타임라인 페이지/);

    expect(title).toBeInTheDocument();
  });

  it('/account/login으로 접근 시 로그인 페이지가 보인다.', async () => {
    const history = createMemoryHistory();

    history.push('/account/login');

    render(
        <Router navigator={history} location={history.location}>
          <App />
        </Router>,
    );

    const title = await screen.findByText(/로그인 페이지/);

    expect(title).toBeInTheDocument();
  });

  it('/profile 으로 접근 시 마이 페이지가 보인다.', async () => {
    const history = createMemoryHistory();

    history.push('/profile');

    render(
        <Router navigator={history} location={history.location}>
          <App />
        </Router>,
    );

    const title = await screen.findByText(/마이페이지/, {selector: 'h1'});

    expect(title).toBeInTheDocument();
  });

  it('/profile 에서 마이페이지 수정을 누르면 수정 페이지가 보인다.', async () => {
    const history = createMemoryHistory();

    history.push('/profile');

    render(
        <Router navigator={history} location={history.location}>
          <App />
        </Router>,
    );

    userEvent.click(screen.getByText(/마이페이지 수정/));

    const title = await screen.findByText(/마이페이지 수정/);

    expect(title).toBeInTheDocument();
  });
});
