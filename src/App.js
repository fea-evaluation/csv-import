import sample from "./sample.csv";

console.log(sample);

function App() {
   return (
      <div>
         <h3>sample.csv</h3>
         <pre>
            <code>{JSON.stringify(sample)}</code>
         </pre>
      </div>
   );
}

export default App;
