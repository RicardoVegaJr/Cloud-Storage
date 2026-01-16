export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "password") {
        console.log("Login successful. Returning a fake token.");
        resolve({ token: "a_fake_token", name:"User" });
      } else {
        console.log("Login failed. Invalid credentials.");
        reject(new Error("Incorrect email or password"));
      }
    }, 1500);
  });
};

export const checkToken = (token) => {
  if (token){
  return new Promise((resolve) => {
    resolve({
      data: { name: "User", email: "test@test.com", _id: "fake-id" },
    });
  });
}
};