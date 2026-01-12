import Main from "./components/Main"


const onLogin = (username, password) => {
  console.log(username, password);
};

function App() {
  return (
    <div>
      <Main onLogin={onLogin} />
    </div>
  );
}

export default App;