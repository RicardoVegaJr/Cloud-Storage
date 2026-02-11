import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  const mockOnLogin = jest.fn();
  const mockOnSwitchToSignup = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render login form with all elements', () => {
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText(/Signup/)).toBeInTheDocument();
  });

  test('should update email input when user types', async () => {
    const user = userEvent.setup();
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });

  test('should update password input when user types', async () => {
    const user = userEvent.setup();
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  test('should call onLogin with email and password when form is submitted', async () => {
    const user = userEvent.setup();
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password');
    await user.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith('test@test.com', 'password');
  });

  test('should prevent default form submission', async () => {
    const user = userEvent.setup();
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const form = screen.getByRole('button', { name: 'Login' }).closest('form');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    
    fireEvent.submit(form);

    expect(mockOnLogin).toHaveBeenCalled();
  });

  test('should call onSwitchToSignup when signup link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const signupLink = screen.getByText('Signup');
    await user.click(signupLink);

    expect(mockOnSwitchToSignup).toHaveBeenCalledTimes(1);
  });

  test('should have required attribute on email input', () => {
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeRequired();
  });

  test('should have required attribute on password input', () => {
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeRequired();
  });

  test('should have password type on password input', () => {
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should initially have empty input fields', () => {
    render(
      <Login 
        onLogin={mockOnLogin} 
        onSwitchToSignup={mockOnSwitchToSignup}
        onClose={mockOnClose}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
});
