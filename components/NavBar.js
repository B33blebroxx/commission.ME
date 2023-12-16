/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import SearchBar from './SearchBar';
import cmLogoMini from '../images/commissionMe-logo.png';

export default function NavBar() {
  return (
    <Navbar id="nav" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand><Image id="nav-logo" src={cmLogoMini} width={68} height={68} alt="Palette Logo" /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link passHref href="/profile/profiles">
              <Nav.Link>Artists</Nav.Link>
            </Link>
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
