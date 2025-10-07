/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('should display login page correctly', () => {

    // verifikasi elemen yang harus tampil
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    //klik tombol login
    cy.get('button').contains(/^Login$/).click();
    //verifikasi window alert untuk menampilkan pesan dari api
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('tes@tes.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('tes@tes.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('tes@tesd.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('123456');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav').should('be.visible');
    cy.get('nav').contains('Home').should('be.visible');
    cy.contains('button', 'Sign Out', { timeout: 10000 }).should('be.visible');
  });
});