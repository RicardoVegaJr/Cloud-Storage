import { authorize, checkToken } from './auth';

const createMockResponse = ({ ok = true, status = 200, json = {} } = {}) => ({
  ok,
  status,
  headers: {
    get: (name) => (name.toLowerCase() === 'content-type' ? 'application/json' : ''),
  },
  json: jest.fn().mockResolvedValue(json),
});

describe('Auth Functions', () => {
  beforeEach(() => {
    process.env.VITE_API_BASE_URL = 'http://localhost:4000';
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('authorize', () => {
    test('should resolve with token and name when credentials are correct', async () => {
      global.fetch.mockResolvedValueOnce(
        createMockResponse({ json: { token: 'real_token', name: 'User' } })
      );

      const result = await authorize('test@test.com', 'password');

      expect(result).toEqual({ token: 'real_token', name: 'User' });
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/auth/login',
        expect.objectContaining({ method: 'POST' })
      );
      const [, options] = global.fetch.mock.calls[0];
      expect(JSON.parse(options.body)).toEqual({
        email: 'test@test.com',
        password: 'password',
      });
    });

    test('should reject with error when response is not ok', async () => {
      global.fetch.mockResolvedValueOnce(
        createMockResponse({ ok: false, status: 401, json: { message: 'Incorrect email or password' } })
      );

      await expect(authorize('wrong@test.com', 'password')).rejects.toThrow(
        'Incorrect email or password'
      );
    });
  });

  describe('checkToken', () => {
    test('should resolve with user data when token is provided', async () => {
      global.fetch.mockResolvedValueOnce(
        createMockResponse({ json: { data: { name: 'User', email: 'test@test.com', _id: 'real-id' } } })
      );

      const token = 'valid_token';
      const result = await checkToken(token);

      expect(result).toEqual({
        data: { name: 'User', email: 'test@test.com', _id: 'real-id' },
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/auth/me',
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
        })
      );
    });

    test('should return null when token is not provided', async () => {
      const result = await checkToken();
      expect(result).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should return null when token is empty string', async () => {
      const result = await checkToken('');
      expect(result).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
