import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className='navbar navbar-expand-md navbar-dark bg-dark'>

            <div className='navbar-brand'>Student Management</div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                  <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to='/studentlist'>Student</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/courselist' >Course</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/count'>No.of students in courses</Link>
                </li>
                <li>
                  <Link className='nav-link' to='/studentsearch'>Search</Link>
                </li>
                <li>
                  <Link className='nav-link' to='/attendance'>Attendance</Link>
                </li>
              </ul>
            </div>
          </nav>
          
        </header>
      </div>
    )
  }
}
