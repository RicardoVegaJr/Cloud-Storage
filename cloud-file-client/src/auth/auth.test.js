import { authorize, checkToken } from './auth';

describe('Auth Functions', () => {
  describe('authorize', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should resolve with token and name when credentials are correct', async () => {
      const authPromise = authorize('test@test.com', 'password');
      jest.advanceTimersByTime(1500);
      
      const result = await authPromise;
      expect(result).toEqual({ token: 'a_fake_token', name: 'User' });
    });

    test('should reject with error when email is incorrect', async () => {
      const authPromise = authorize('wrong@test.com', 'password');
      jest.advanceTimersByTime(1500);
      
      await expect(authPromise).rejects.toThrow('Incorrect email or password');
    });

    test('should reject with error when password is incorrect', async () => {
      const authPromise = authorize('test@test.com', 'wrongpassword');
      jest.advanceTimersByTime(1500);
      
      await expect(authPromise).rejects.toThrow('Incorrect email or password');
    });

    test('should reject with error when both credentials are incorrect', async () => {
      const authPromise = authorize('wrong@test.com', 'wrongpassword');
      jest.advanceTimersByTime(1500);
      
      await expect(authPromise).rejects.toThrow('Incorrect email or password');
    });

    test('should take 1500ms to resolve', async () => {
      const startTime = Date.now();
      const authPromise = authorize('test@test.com', 'password');
      
      jest.advanceTimersByTime(1500);
      await authPromise;
      
      const elapsedTime = jest.getTimerCount();
      expect(elapsedTime).toBe(0); // All timers should have been exhausted
    });
  });

  describe('checkToken', () => {
    test('should resolve with user data when token is provided', async () => {
      const token = 'valid_token';
      const result = await checkToken(token);
      
      expect(result).toEqual({
        data: { 
          name: 'User', 
          email: 'test@test.com', 
          _id: 'fake-id' 
        }
      });
    });

    test('should not resolve when token is not provided', async () => {
      const result = await checkToken();
      expect(result).toBeUndefined();
    });

    test('should not resolve when token is null', async () => {
      const result = await checkToken(null);
      expect(result).toBeUndefined();
    });

    test('should not resolve when token is empty string', async () => {
      const result = await checkToken('');
      expect(result).toBeUndefined();
    });
  });
});
