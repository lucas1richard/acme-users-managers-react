import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.handleChangeManager = this.handleChangeManager.bind(this);
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(({ data }) => this.setState({ users: data }));
  }

  handleChangeManager(ev, userId) {
    const managerId = ev.target.value;
    axios.put(`/api/users/${userId}`, {managerId})
      .then(( { data }) => {
        const users = this.state.users.map(user => {
          if (user.id * 1 === data.id * 1) {
            user = data;
          }
          return user;
        });
        this.setState({ users });
      });
  }

  onPageChange(pagename) {
    browserHistory.push(pagename);
  }

  render() {
    const { pathname } = this.props.router.location;
    return (
      <div>
        <h1>Acme Users Managers React-Router</h1>
        <ul className="nav nav-tabs" style={{ marginBottom: '20px' }}>
          <li className={ pathname === '/' ? 'active' : '' }>
            <Link to="/" activeClassName="active" onlyActiveOnIndex={ true }>Home</Link>
          </li>
          <li className={ (pathname === '/users' || pathname === '/users/edit') ? 'active' : '' }>
            <Link to="/users" activeClassName="active">Users ({ this.state.users.length })</Link>
          </li>
        </ul>
        {
          React.cloneElement(this.props.children, {
            users: this.state.users,
            router: this.props.router,
            managers: this.state.managers,
            handleChangeManager: this.handleChangeManager
          })
        }
      </div>
    );
  }
}

export default Main;
